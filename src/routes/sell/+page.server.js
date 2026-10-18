
import { fail, redirect, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import { createAuthClient } from '$lib/server/auth.js';

/**
 * @typedef {import('@supabase/supabase-js').SupabaseClient} SupabaseClient
 */

const REQUIRED_DOCUMENTS = [
  'business_license',
  'export_license'
];

function getAdminClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    throw error(
      503,
      'Product registration is temporarily unavailable.'
    );
  }

  return createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
async function getExporter(event) {
  const authClient = createAuthClient(event);

  const {
    data: { user },
    error: authError
  } = await authClient.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const supabase = getAdminClient();

  const { data: profile, error: profileError } = await supabase
    .from('trade_profiles')
    .select('user_id, account_type')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    console.error(
      'Exporter profile error:',
      profileError.message
    );

    throw error(
      500,
      'Unable to verify exporter profile.'
    );
  }

  return {
    user,
    profile,
    supabase
  };
}

/**
 * @param {SupabaseClient} supabase
 * @param {string} userId
 */
async function getAssessment(supabase, userId) {
  const { data, error: assessmentError } = await supabase
    .from('exporter_assessments')
    .select('score, status')
    .eq('exporter_id', userId)
    .order('attempt_number', { ascending: false })
    .limit(1);

  if (assessmentError) {
    console.error(
      'Assessment error:',
      assessmentError.message
    );

    throw error(
      500,
      'Unable to check export readiness.'
    );
  }

  const latest = data?.[0] ?? null;

  const score =
    latest?.score === null ||
    latest?.score === undefined
      ? null
      : Number(latest.score);

  return {
    score,
    passed:
      latest?.status === 'passed' &&
      score !== null &&
      Number.isFinite(score) &&
      score >= 60
  };
}

/**
 * Check that both mandatory exporter documents
 * have been approved by an administrator.
 *
 * @param {SupabaseClient} supabase
 * @param {string} userId
 */
async function getDocumentVerification(supabase, userId) {
  const { data: documents, error: documentsError } =
    await supabase
      .from('exporter_documents')
      .select('document_type, review_status')
      .eq('exporter_id', userId)
      .in('document_type', REQUIRED_DOCUMENTS);

  if (documentsError) {
    console.error(
      'Exporter document verification error:',
      documentsError.message
    );

    throw error(
      500,
      'Unable to verify exporter documents.'
    );
  }

  const approvedTypes = new Set(
    (documents ?? [])
      .filter((doc) => doc.review_status === 'approved')
      .map((doc) => doc.document_type)
  );

  const missingDocuments = REQUIRED_DOCUMENTS.filter(
    (type) => !approvedTypes.has(type)
  );

  return {
    verified: missingDocuments.length === 0,
    businessLicenseApproved:
      approvedTypes.has('business_license'),
    exportLicenseApproved:
      approvedTypes.has('export_license'),
    missingDocuments
  };
}

/**
 * @param {SupabaseClient} supabase
 * @param {string} userId
 */
async function getEligibility(supabase, userId) {
  const assessment = await getAssessment(
    supabase,
    userId
  );

  const verification = await getDocumentVerification(
    supabase,
    userId
  );

  return {
    assessment,
    verification,
    canSubmit:
      assessment.passed &&
      verification.verified
  };
}

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const exporter = await getExporter(event);

  if (!exporter) {
    redirect(303, '/login');
  }

  if (exporter.profile?.account_type !== 'exporter') {
    throw error(
      403,
      'An Ethiopian Exporter account is required.'
    );
  }

  const eligibility = await getEligibility(
    exporter.supabase,
    exporter.user.id
  );

  return {
    assessmentScore: eligibility.assessment.score,

    // Existing field retained for compatibility
    exportReady: eligibility.assessment.passed,

    // Additional verification fields
    documentsVerified:
      eligibility.verification.verified,

    businessLicenseApproved:
      eligibility.verification.businessLicenseApproved,

    exportLicenseApproved:
      eligibility.verification.exportLicenseApproved,

    missingDocuments:
      eligibility.verification.missingDocuments,

    canSubmitProduct: eligibility.canSubmit
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const exporter = await getExporter(event);

    if (!exporter) {
      redirect(303, '/login');
    }

    if (exporter.profile?.account_type !== 'exporter') {
      return fail(403, {
        message:
          'An Ethiopian Exporter account is required.'
      });
    }

    const { user, supabase } = exporter;

    // IMPORTANT:
    // Always verify eligibility on the server
    // before accepting or saving any submission.
    const eligibility = await getEligibility(
      supabase,
      user.id
    );

    if (!eligibility.assessment.passed) {
      return fail(403, {
        message:
          'You must pass the Export Readiness Assessment with at least 60% before submitting products.'
      });
    }

    if (!eligibility.verification.verified) {
      const missingLabels =
        eligibility.verification.missingDocuments.map(
          (type) => {
            if (type === 'business_license') {
              return 'Business License';
            }

            if (type === 'export_license') {
              return 'Export License';
            }

            return type;
          }
        );

      return fail(403, {
        message:
          'Your exporter documents must be approved by an administrator before you can list products. Approval required for: ' +
          missingLabels.join(', ') +
          '.'
      });
    }

    const data = await event.request.formData();

    /** @type {Record<string, string>} */
    const submission = {
      seller_name: String(
        data.get('sellerName') ?? ''
      ).trim(),

      phone: String(
        data.get('phone') ?? ''
      ).trim(),

      product_name: String(
        data.get('productName') ?? ''
      ).trim(),

      direction: 'export',

      category: String(
        data.get('category') ?? ''
      ).trim(),

      origin: String(
        data.get('location') ?? ''
      ).trim(),

      quantity: String(
        data.get('quantity') ?? ''
      ).trim(),

      description: String(
        data.get('description') ?? ''
      ).trim()
    };

    const limits = {
      seller_name: 100,
      phone: 30,
      product_name: 100,
      category: 80,
      origin: 100,
      quantity: 80,
      description: 2000
    };

    const invalidField = Object.entries(limits).some(
      ([field, limit]) =>
        !submission[field] ||
        submission[field].length > limit
    );

    if (invalidField) {
      return fail(400, {
        message:
          'Please complete all required fields correctly.'
      });
    }

    const photo = data.get('photo');

    if (typeof photo === 'string' && photo) {
      return fail(400, {
        message: 'Please select a valid photo.'
      });
    }

    const hasPhoto =
      photo !== null &&
      typeof photo !== 'string' &&
      photo.size > 0;

    if (
      hasPhoto &&
      photo.size > 2 * 1024 * 1024
    ) {
      return fail(400, {
        message:
          'Photo must be smaller than 2 MB.'
      });
    }

    /** @type {string | null} */
    let imagePath = null;

    if (hasPhoto) {
      const bytes = new Uint8Array(
        await photo.arrayBuffer()
      );

      const isJpeg =
        bytes[0] === 0xff &&
        bytes[1] === 0xd8 &&
        bytes[2] === 0xff;

      const pngHeader = [
        137, 80, 78, 71, 13, 10, 26, 10
      ];

      const isPng = pngHeader.every(
        (value, index) =>
          bytes[index] === value
      );

      const validJpeg =
        photo.type === 'image/jpeg' &&
        isJpeg;

      const validPng =
        photo.type === 'image/png' &&
        isPng;

      if (!validJpeg && !validPng) {
        return fail(400, {
          message:
            'Only JPG and PNG photos are allowed.'
        });
      }

      const extension = validJpeg
        ? 'jpg'
        : 'png';

      const contentType = validJpeg
        ? 'image/jpeg'
        : 'image/png';

      imagePath =
        `submissions/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } =
        await supabase.storage
          .from('product-photos')
          .upload(imagePath, bytes, {
            contentType,
            upsert: false
          });

      if (uploadError) {
        console.error(
          'Photo upload failed:',
          uploadError.message
        );

        return fail(500, {
          message:
            'Photo upload failed. Please try again.'
        });
      }
    }

    const { error: saveError } = await supabase
      .from('product_submissions')
      .insert({
        ...submission,
        exporter_id: user.id,
        status: 'pending',
        image_path: imagePath
      });

    if (saveError) {
      if (imagePath) {
        const { error: cleanupError } =
          await supabase.storage
            .from('product-photos')
            .remove([imagePath]);

        if (cleanupError) {
          console.error(
            'Photo cleanup failed:',
            cleanupError.message
          );
        }
      }

      console.error(
        'Product submission failed:',
        saveError.message
      );

      return fail(500, {
        message:
          'Could not save your product. Please try again.'
      });
    }

    return {
      success: true,
      message:
        'Your export product has been submitted for administrator review.'
    };
  }
};
