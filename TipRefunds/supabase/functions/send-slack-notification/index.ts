import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SLACK_WEBHOOK_URL = Deno.env.get('SLACK_WEBHOOK_URL');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadNotification {
  type: 'consultation' | 'credit_calculation';
  record: any;
}

function formatSlackMessage(type: string, record: any): any {
  const timestamp = new Date(record.created_at).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  if (type === 'consultation') {
    return {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🗓️ New Consultation Request",
            emoji: true
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Contact Name:*\n${record.name}`
            },
            {
              type: "mrkdwn",
              text: `*Business:*\n${record.business_name || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n<mailto:${record.email}|${record.email}>`
            },
            {
              type: "mrkdwn",
              text: `*Phone:*\n<tel:${record.phone}|${record.phone}>`
            },
            {
              type: "mrkdwn",
              text: `*Preferred Date:*\n${record.preferred_date}`
            },
            {
              type: "mrkdwn",
              text: `*Preferred Time:*\n${record.preferred_time}`
            }
          ]
        }
      ]
    };
  }

  if (type === 'credit_calculation') {
    const estimatedCredit = Number(record.estimated_credit || 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const monthlyTips = Number(record.avg_monthly_tips || 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "💰 New Credit Calculation Lead",
            emoji: true
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Estimated Annual Credit: ${estimatedCredit}*`
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Business Name:*\n${record.business_name || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Contact Name:*\n${record.contact_name || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n<mailto:${record.email}|${record.email}>`
            },
            {
              type: "mrkdwn",
              text: `*Phone:*\n<tel:${record.phone}|${record.phone}>`
            },
            {
              type: "mrkdwn",
              text: `*Business Type:*\n${record.business_type || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Employees:*\n${record.num_employees || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Monthly Tips:*\n${monthlyTips}`
            },
            {
              type: "mrkdwn",
              text: `*Submitted:*\n${timestamp}`
            }
          ]
        },
        {
          type: "divider"
        }
      ]
    };
  }

  return { text: 'New lead received' };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { type, record }: LeadNotification = await req.json();

    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URL not configured');
      return new Response(
        JSON.stringify({ error: 'Slack webhook not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const slackMessage = formatSlackMessage(type, record);

    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      const errorText = await slackResponse.text();
      console.error('Slack API error:', errorText);
      throw new Error('Failed to send Slack notification');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending Slack notification:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send notification' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});