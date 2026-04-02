/*
  # Remove Slack Notification Triggers

  1. Changes
    - Remove trigger function for Slack notifications
    - Drop triggers from both tables
  
  2. Reason
    - Slack notifications will be handled directly from frontend instead of database triggers
    - Simpler approach without needing pg_net extension
*/

-- Drop triggers
DROP TRIGGER IF EXISTS on_credit_calculation_insert ON credit_calculations;
DROP TRIGGER IF EXISTS on_consultation_request_insert ON consultation_requests;

-- Drop function
DROP FUNCTION IF EXISTS notify_slack_new_lead();