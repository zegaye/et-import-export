
import { error, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '$lib/server/auth.js';

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const complianceTypes = [
  'export_license',
  'product_certificate'
];

function getAdminDb() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    error(500, 'Supabase server configuration is missing.');
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

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  await requireAdmin(event);

  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const db = getAdminDb();

  const [
    documentsResult,
    profilesResult,
    assessmentsResult,
    complianceResult
  ] = await Promise.all([
    db
      .from('international_supplier_documents')
      .select(
        'id, supplier_id, document_type, review_status, review_notes, created_at, reviewed_at'
      )
      .order('created_at', { ascending: false }),

    db
      .from('trade_profiles')
      .select(
        'user_id, company_name, full_name, country, verification_status'
      )
      .eq('account_type', 'international_supplier'),

    db
      .from('international_supplier_assessments')
      .select(
        'supplier_id, score, status, attempt_number, submitted_at'
      )
      .order('attempt_number', { ascending: false })
      .order('submitted_at', { ascending: false }),

    db
      .from('international_supplier_compliance')
      .select(
        'supplier_id, requirement_type, applicability, justification, reviewed_by, reviewed_at'
      )
  ]);

  if (documentsResult.error) {
    console.error(
      'Supplier documents:',
      documentsResult.error.code
    );
    error(500, 'Unable to load supplier documents.');
  }

  if (profilesResult.error) {
    console.error(
      'Supplier profiles:',
      profilesResult.error.code
    );
    error(500, 'Unable to load supplier profiles.');
  }

  if (assessmentsResult.error) {
    console.error(
      'Supplier assessments:',
      assessmentsResult.error.code
    );
    error(500, 'Unable to load supplier assessments.');
  }

  if (complianceResult.error) {
    console.error(
      'Supplier compliance:',
      complianceResult.error.code
    );
    error(500, 'Unable to load supplier compliance.');
  }

  const documents = documentsResult.data ?? [];
  const profiles = profilesResult.data ?? [];
  const assessments = assessmentsResult.data ?? [];
  const compliance = complianceResult.data ?? [];

  const companyMap = new Map(
    profiles.map((profile) => [
      profile.user_id,
      profile
    ])
  );

  const latestAssessmentMap = new Map();

  for (const assessment of assessments) {
    if (!latestAssessmentMap.has(assessment.supplier_id)) {
      latestAssessmentMap.set(
        assessment.supplier_id,
        assessment
      );
    }
  }

  const supplierDocuments = documents.map((doc) => {
    const profile = companyMap.get(doc.supplier_id);

    return {
      id: doc.id,
      supplier_id: doc.supplier_id,
      document_type: doc.document_type,
      review_status: doc.review_status,
      review_notes: doc.review_notes,
      created_at: doc.created_at,
      reviewed_at: doc.reviewed_at,
      company_name:
        profile?.company_name ?? 'Unknown company',
      full_name:
        profile?.full_name ?? 'Unknown supplier'
    };
  });

  const suppliers = profiles.map((profile) => {
    const assessment =
      latestAssessmentMap.get(profile.user_id);

    const ownDocuments = supplierDocuments.filter(
      (doc) => doc.supplier_id === profile.user_id
    );

    const ownCompliance = compliance.filter(
      (item) => item.supplier_id === profile.user_id
    );

    return {
      supplier_id: profile.user_id,
      company_name: profile.company_name,
      full_name: profile.full_name,
      country: profile.country,
      verification_status: profile.verification_status,
      assessment_score: assessment?.score ?? null,
      assessment_status:
        assessment?.status ?? 'not_started',
      assessment_attempt:
        assessment?.attempt_number ?? null,

      total_documents: ownDocuments.length,
      approved_documents: ownDocuments.filter(
        (doc) => doc.review_status === 'approved'
      ).length,
      pending_documents: ownDocuments.filter(
        (doc) => doc.review_status === 'pending'
      ).length,
      rejected_documents: ownDocuments.filter(
        (doc) => doc.review_status === 'rejected'
      ).length,

      compliance: complianceTypes.map((type) => {
        const item = ownCompliance.find(
          (entry) => entry.requirement_type === type
        );

        return {
          requirement_type: type,
          applicability:
            item?.applicability ?? 'not_determined',
          justification: item?.justification ?? '',
          reviewed_at: item?.reviewed_at ?? null,
          reviewed_by: item?.reviewed_by ?? null
        };
      })
    };
  });

  return {
    documents: supplierDocuments,
    suppliers
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  review: async (event) => {
    await requireAdmin(event);

    const form = await event.request.formData();

    const id = String(form.get('id') ?? '').trim();
    const status = String(form.get('status') ?? '').trim();
    const notes = String(form.get('notes') ?? '').trim();

    if (!uuidPattern.test(id)) {
      return fail(400, {
        success: false,
        message: 'Invalid document ID.'
      });
    }

    if (!['approved', 'rejected'].includes(status)) {
      return fail(400, {
        success: false,
        message: 'Invalid review decision.'
      });
    }

    if (notes.length > 1000) {
      return fail(400, {
        success: false,
        message:
          'Review notes must be 1000 characters or fewer.'
      });
    }

    if (status === 'rejected' && !notes) {
      return fail(400, {
        success: false,
        message: 'Provide a reason for rejection.'
      });
    }

    const db = getAdminDb();

    const { data: updated, error: updateError } =
      await db
        .from('international_supplier_documents')
        .update({
          review_status: status,
          review_notes: notes || null,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('review_status', 'pending')
        .select('id')
        .maybeSingle();

    if (updateError) {
      console.error(
        'Supplier review:',
        updateError.code
      );

      return fail(500, {
        success: false,
        message: 'Unable to save the review.'
      });
    }

    if (!updated) {
      return fail(409, {
        success: false,
        message:
          'Document not found or already reviewed.'
      });
    }

    return {
      success: true,
      message:
        status === 'approved'
          ? 'Supplier document approved.'
          : 'Supplier document rejected.'
    };
  },

  compliance: async (event) => {
    const { user } = await requireAdmin(event);

    const form = await event.request.formData();

    const supplierId =
      String(form.get('supplier_id') ?? '').trim();

    const requirementType =
      String(form.get('requirement_type') ?? '').trim();

    const applicability =
      String(form.get('applicability') ?? '').trim();

    const justification =
      String(form.get('justification') ?? '').trim();

    if (!uuidPattern.test(supplierId)) {
      return fail(400, {
        success: false,
        message: 'Invalid supplier ID.'
      });
    }

    if (!complianceTypes.includes(requirementType)) {
      return fail(400, {
        success: false,
        message: 'Invalid compliance requirement.'
      });
    }

    if (
      ![
        'not_determined',
        'required',
        'not_applicable'
      ].includes(applicability)
    ) {
      return fail(400, {
        success: false,
        message: 'Invalid applicability selection.'
      });
    }

    if (justification.length > 1000) {
      return fail(400, {
        success: false,
        message:
          'Justification must be 1000 characters or fewer.'
      });
    }

    if (
      applicability === 'not_applicable' &&
      !justification
    ) {
      return fail(400, {
        success: false,
        message:
          'Explain why this document is not applicable.'
      });
    }

    const db = getAdminDb();

    const { data: profile, error: profileError } =
      await db
        .from('trade_profiles')
        .select('user_id')
        .eq('user_id', supplierId)
        .eq('account_type', 'international_supplier')
        .maybeSingle();

    if (profileError || !profile) {
      return fail(404, {
        success: false,
        message: 'International supplier not found.'
      });
    }

    const reviewed =
      applicability !== 'not_determined';

    const { error: saveError } =
      await db
        .from('international_supplier_compliance')
        .upsert(
          {
            supplier_id: supplierId,
            requirement_type: requirementType,
            applicability,
            justification: justification || null,
            reviewed_by: reviewed ? user.id : null,
            reviewed_at:
              reviewed ? new Date().toISOString() : null
          },
          {
            onConflict: 'supplier_id,requirement_type'
          }
        );

    if (saveError) {
      console.error(
        'Supplier compliance:',
        saveError.code,
        saveError.message
      );

      return fail(500, {
        success: false,
        message: 'Unable to save compliance decision.'
      });
    }

    return {
      success: true,
      message: 'Supplier compliance decision saved.'
    };
  },

  finalize: async (event) => {
    const { user } = await requireAdmin(event);

    const form = await event.request.formData();

    const supplierId =
      String(form.get('supplier_id') ?? '').trim();

    const decision =
      String(form.get('decision') ?? '').trim();

    const notes =
      String(form.get('notes') ?? '').trim();

    if (!uuidPattern.test(supplierId)) {
      return fail(400, {
        success: false,
        message: 'Invalid supplier ID.'
      });
    }

    if (!['verified', 'rejected'].includes(decision)) {
      return fail(400, {
        success: false,
        message: 'Select a valid verification decision.'
      });
    }

    if (notes.length > 1000) {
      return fail(400, {
        success: false,
        message:
          'Review notes must be 1000 characters or fewer.'
      });
    }

    if (decision === 'rejected' && !notes) {
      return fail(400, {
        success: false,
        message: 'Provide a reason for rejection.'
      });
    }

    const db = getAdminDb();

    const { data: profile, error: profileError } =
      await db
        .from('trade_profiles')
        .select('user_id')
        .eq('user_id', supplierId)
        .eq('account_type', 'international_supplier')
        .maybeSingle();

    if (profileError || !profile) {
      return fail(404, {
        success: false,
        message: 'International supplier not found.'
      });
    }

    const { error: rpcError } =
      await db.rpc(
        'finalize_international_supplier_verification',
        {
          p_supplier_id: supplierId,
          p_admin_id: user.id,
          p_decision: decision,
          p_notes: notes || null
        }
      );

    if (rpcError) {
      console.error(
        'Supplier verification RPC:',
        rpcError.code,
        rpcError.message
      );

      return fail(400, {
        success: false,
        message:
          'Verification could not be finalized. Check the assessment, required documents and compliance decisions.'
      });
    }

    return {
      success: true,
      message:
        decision === 'verified'
          ? 'International supplier verified successfully.'
          : 'International supplier verification rejected.'
    };
  }
};
