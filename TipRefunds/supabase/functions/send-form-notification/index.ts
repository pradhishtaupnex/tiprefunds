import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const NOTIFICATION_EMAIL = 'marketing@adsugar.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface EmailRequest {
  type: 'consultation' | 'quick_estimate' | 'credit_calculation';
  data: any;
}

function generateEmailHTML(type: string, data: any): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  if (type === 'consultation') {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0A1E3F 0%, #00A8A8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #0A1E3F; }
            .value { color: #555; margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🗓️ New Consultation Request</h1>
              <p>Tip Refunds - FICA Credit Service</p>
            </div>
            <div class="content">
              <p><strong>Submitted:</strong> ${timestamp}</p>
              
              <div class="field">
                <div class="label">Contact Name:</div>
                <div class="value">${data.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Business Name:</div>
                <div class="value">${data.business_name || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Preferred Date:</div>
                <div class="value">${data.preferred_date}</div>
              </div>
              
              <div class="field">
                <div class="label">Preferred Time:</div>
                <div class="value">${data.preferred_time}</div>
              </div>
              
              ${data.message ? `
              <div class="field">
                <div class="label">Additional Information:</div>
                <div class="value">${data.message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>This is an automated notification from Tip Refunds</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  if (type === 'credit_calculation') {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0A1E3F 0%, #00A8A8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: #00A8A8; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #0A1E3F; }
            .value { color: #555; margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 New Credit Calculation</h1>
              <p>Tip Refunds - FICA Credit Service</p>
            </div>
            <div class="content">
              <p><strong>Submitted:</strong> ${timestamp}</p>
              
              <div class="highlight">
                <h2 style="margin: 0; font-size: 32px;">$${Number(data.estimated_credit || 0).toLocaleString()}</h2>
                <p style="margin: 5px 0 0 0;">Estimated Annual Credit</p>
              </div>
              
              <div class="field">
                <div class="label">Business Name:</div>
                <div class="value">${data.business_name || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Contact Name:</div>
                <div class="value">${data.contact_name || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Business Type:</div>
                <div class="value">${data.business_type || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Number of Employees:</div>
                <div class="value">${data.num_employees || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Average Monthly Tips:</div>
                <div class="value">$${Number(data.avg_monthly_tips || 0).toLocaleString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated notification from Tip Refunds</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  // Quick estimate
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0A1E3F 0%, #00A8A8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #00A8A8; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
          .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #0A1E3F; }
          .value { color: #555; margin-top: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚡ New Quick Estimate</h1>
            <p>Tip Refunds - FICA Credit Service</p>
          </div>
          <div class="content">
            <p><strong>Submitted:</strong> ${timestamp}</p>
            
            <div class="highlight">
              <h2 style="margin: 0; font-size: 32px;">$${Number(data.estimated_credit || 0).toLocaleString()}</h2>
              <p style="margin: 5px 0 0 0;">Estimated 3-Year Credit</p>
            </div>
            
            <div class="field">
              <div class="label">Number of Employees:</div>
              <div class="value">${data.employees}</div>
            </div>
            
            <div class="field">
              <div class="label">Monthly Tips:</div>
              <div class="value">$${Number(data.monthly_tips || 0).toLocaleString()}</div>
            </div>
            
            <div class="field">
              <div class="label">State:</div>
              <div class="value">${data.state}</div>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated notification from Tip Refunds</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function getSubject(type: string): string {
  switch (type) {
    case 'consultation':
      return '🗓️ New Consultation Request - Tip Refunds';
    case 'credit_calculation':
      return '💰 New Credit Calculation - Tip Refunds';
    case 'quick_estimate':
      return '⚡ New Quick Estimate - Tip Refunds';
    default:
      return '📧 New Form Submission - Tip Refunds';
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { type, data }: EmailRequest = await req.json();

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailHTML = generateEmailHTML(type, data);
    const subject = getSubject(type);

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Tip Refunds <notifications@tiprefunds.com>',
        to: [NOTIFICATION_EMAIL],
        subject: subject,
        html: emailHTML,
      }),
    });

    const responseData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API error:', responseData);
      throw new Error(responseData.message || 'Failed to send email');
    }

    return new Response(
      JSON.stringify({ success: true, id: responseData.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send email' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});