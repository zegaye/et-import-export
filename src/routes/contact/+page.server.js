import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    /** @param {string} field */
    function read(field) {
      const value = data.get(field);
      return typeof value === 'string' ? value.trim() : '';
    }

    const values = {
      name: read('name'),
      company: read('company'),
      email: read('email'),
      phone: read('phone'),
      inquiryType: read('inquiryType'),
      product: read('product'),
      quantity: read('quantity'),
      message: read('message')
    };

    const fields = [
      { value: values.name, limit: 100, required: true },
      { value: values.company, limit: 120, required: false },
      { value: values.email, limit: 150, required: true },
      { value: values.phone, limit: 30, required: true },
      { value: values.product, limit: 120, required: false },
      { value: values.quantity, limit: 80, required: false },
      { value: values.message, limit: 2000, required: true }
    ];

    const allowedTypes = [
      'Buying / sourcing',
      'Selling / supplier',
      'Import inquiry',
      'Export inquiry',
      'General question'
    ];

    const invalidField = fields.some(
      (field) =>
        (field.required && !field.value) ||
        field.value.length > field.limit
    );

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);

    if (
      invalidField ||
      !validEmail ||
      !allowedTypes.includes(values.inquiryType)
    ) {
      return fail(400, {
        success: false,
        message: 'Please complete the required fields with valid information.',
        values
      });
    }

    if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
      console.error('Supabase environment variables are missing.');

      return fail(500, {
        success: false,
        message: 'Inquiries are temporarily unavailable. Please call our team.',
        values
      });
    }

    const database = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SECRET_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );

    const { error } = await database
      .from('buyer_inquiries')
      .insert({
        full_name: values.name,
        company: values.company,
        email: values.email,
        phone: values.phone,
        inquiry_type: values.inquiryType,
        product_name: values.product,
        quantity: values.quantity,
        message: values.message,
        status: 'new'
      });

    if (error) {
      console.error('Could not save inquiry:', error.message);

      return fail(500, {
        success: false,
        message: 'We could not save your inquiry. Please try again.',
        values
      });
    }

    const whatsappMessage = [
      'ET Import Export inquiry',
      '',
      `Inquiry type: ${values.inquiryType}`,
      `Product: ${values.product || 'General inquiry'}`,
      `Name: ${values.name}`,
      `Company: ${values.company || 'Not provided'}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Quantity: ${values.quantity || 'Not specified'}`,
      '',
      `Message: ${values.message}`
    ].join('\n');

    return {
      success: true,
      message: 'Your inquiry has been saved. Our team will follow up with you.',
      whatsappUrl:
        `https://wa.me/251911377969?text=${encodeURIComponent(whatsappMessage)}`
    };
  }
};