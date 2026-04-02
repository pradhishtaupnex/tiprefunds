/*
  # Move pg_net Extension to Extensions Schema
  
  1. Security Fix
    - Drop pg_net from public schema
    - Create extensions schema if it doesn't exist
    - Install pg_net in extensions schema
    
  2. Purpose
    - Follows security best practice of keeping extensions separate from public schema
    - Prevents potential security issues with extensions in public schema
*/

DROP EXTENSION IF EXISTS pg_net;

CREATE SCHEMA IF NOT EXISTS extensions;

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;