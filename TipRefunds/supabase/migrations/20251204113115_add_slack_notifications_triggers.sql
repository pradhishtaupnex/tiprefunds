/*
  # Add Slack Notification Triggers

  1. Changes
    - Create trigger function to send Slack notifications when new leads are created
    - Add trigger on `credit_calculations` table for new insertions
    - Add trigger on `consultation_requests` table for new insertions
  
  2. Security
    - Triggers run with SECURITY DEFINER to bypass RLS
    - Only fires on INSERT operations to notify team of new leads
  
  3. Functionality
    - Automatically calls the Slack notification edge function when new records are inserted
    - Sends formatted Slack messages with lead details to configured Slack channel
*/

-- Create function to send Slack notifications
CREATE OR REPLACE FUNCTION notify_slack_new_lead()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  request_id bigint;
  lead_type text;
BEGIN
  -- Determine the lead type based on the table
  IF TG_TABLE_NAME = 'credit_calculations' THEN
    lead_type := 'credit_calculation';
  ELSIF TG_TABLE_NAME = 'consultation_requests' THEN
    lead_type := 'consultation';
  ELSE
    lead_type := 'unknown';
  END IF;

  -- Call the edge function asynchronously using pg_net extension
  -- Note: This requires the pg_net extension to be enabled
  SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/send-slack-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := jsonb_build_object(
      'type', lead_type,
      'record', row_to_json(NEW)
    )
  ) INTO request_id;

  RETURN NEW;
END;
$$;

-- Create trigger for credit_calculations table
DROP TRIGGER IF EXISTS on_credit_calculation_insert ON credit_calculations;
CREATE TRIGGER on_credit_calculation_insert
  AFTER INSERT ON credit_calculations
  FOR EACH ROW
  EXECUTE FUNCTION notify_slack_new_lead();

-- Create trigger for consultation_requests table
DROP TRIGGER IF EXISTS on_consultation_request_insert ON consultation_requests;
CREATE TRIGGER on_consultation_request_insert
  AFTER INSERT ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_slack_new_lead();