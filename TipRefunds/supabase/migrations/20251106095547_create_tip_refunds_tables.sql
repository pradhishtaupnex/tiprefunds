/*
  # Create Tip Refunds Application Tables

  1. New Tables
    - `credit_calculations`
      - `id` (uuid, primary key)
      - `business_name` (text)
      - `contact_name` (text)
      - `email` (text)
      - `phone` (text)
      - `business_type` (text)
      - `num_employees` (integer)
      - `avg_monthly_tips` (numeric)
      - `estimated_credit` (numeric)
      - `created_at` (timestamptz)
    
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `name` (text)
      - `business_name` (text)
      - `email` (text)
      - `phone` (text)
      - `preferred_date` (text)
      - `preferred_time` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public insert access (forms are public-facing)
    - Service role can read all records for admin purposes
*/

CREATE TABLE IF NOT EXISTS credit_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_type text NOT NULL,
  num_employees integer NOT NULL,
  avg_monthly_tips numeric NOT NULL DEFAULT 0,
  estimated_credit numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credit_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit credit calculations"
  ON credit_calculations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read all calculations"
  ON credit_calculations
  FOR SELECT
  TO service_role
  USING (true);

CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_date text NOT NULL,
  preferred_time text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit consultation requests"
  ON consultation_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read all consultation requests"
  ON consultation_requests
  FOR SELECT
  TO service_role
  USING (true);