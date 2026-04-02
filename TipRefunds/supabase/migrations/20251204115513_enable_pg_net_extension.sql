/*
  # Enable pg_net Extension and Database Configuration
  
  1. Changes
    - Enable pg_net extension for async HTTP requests
    - Configure database settings for Supabase URL and service role key
    
  2. Purpose
    - pg_net is required for database triggers to make HTTP calls to edge functions
    - Configuration settings allow triggers to authenticate with Supabase
*/

-- Enable pg_net extension for async HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Note: Database configuration for app.settings.supabase_url and app.settings.service_role_key
-- must be set in Supabase Dashboard > Settings > Database > Custom Postgres Config
-- These cannot be set via SQL for security reasons