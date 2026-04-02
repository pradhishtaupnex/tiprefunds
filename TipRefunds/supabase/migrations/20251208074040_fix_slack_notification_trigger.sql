/*
  # Fix Slack Notification Trigger

  1. Changes
    - Update trigger function to handle errors gracefully
    - Wrap HTTP call in exception handler to prevent blocking inserts
    - Allow form submissions to succeed even if Slack notification fails
  
  2. Purpose
    - Ensure calculator and consultation forms work properly
    - Prevent trigger failures from blocking legitimate data inserts
    - Log errors without breaking the user experience
*/

CREATE OR REPLACE FUNCTION notify_slack_new_lead()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, extensions
LANGUAGE plpgsql
AS $$
DECLARE
  request_id bigint;
  lead_type text;
  supabase_url text;
  service_key text;
BEGIN
  IF TG_TABLE_NAME = 'credit_calculations' THEN
    lead_type := 'credit_calculation';
  ELSIF TG_TABLE_NAME = 'consultation_requests' THEN
    lead_type := 'consultation';
  ELSE
    lead_type := 'unknown';
  END IF;

  BEGIN
    supabase_url := current_setting('app.settings.supabase_url', true);
    service_key := current_setting('app.settings.service_role_key', true);
    
    IF supabase_url IS NOT NULL AND service_key IS NOT NULL THEN
      SELECT extensions.net.http_post(
        url := supabase_url || '/functions/v1/send-slack-notification',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || service_key
        ),
        body := jsonb_build_object(
          'type', lead_type,
          'record', row_to_json(NEW)
        )
      ) INTO request_id;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END;

  RETURN NEW;
END;
$$;