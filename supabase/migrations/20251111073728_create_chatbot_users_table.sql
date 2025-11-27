/*
  # Create chatbot users table

  1. New Tables
    - `chatbot_users`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `chatbot_users` table
    - Add policy for service role to insert data
*/

CREATE TABLE IF NOT EXISTS chatbot_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chatbot_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role to insert chatbot users"
  ON chatbot_users
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to read chatbot users"
  ON chatbot_users
  FOR SELECT
  TO service_role
  USING (true);