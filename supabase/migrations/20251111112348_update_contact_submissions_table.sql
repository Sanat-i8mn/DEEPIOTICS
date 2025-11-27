/*
  # Update contact_submissions table

  1. Changes
    - Add `phone` column (text, optional)
    - Add `subject` column (text, required)
    - Add `message` column (text, required)
    - Remove `ai_service_interest` column
    - Rename `project_details` to a backup column before adding `message`
  
  2. Notes
    - Preserves existing data by renaming columns instead of dropping them
    - New columns support the updated contact form fields
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'project_details'
  ) THEN
    ALTER TABLE contact_submissions RENAME COLUMN project_details TO project_details_old;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'ai_service_interest'
  ) THEN
    ALTER TABLE contact_submissions RENAME COLUMN ai_service_interest TO ai_service_interest_old;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'phone'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN phone text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'subject'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN subject text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'message'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN message text;
  END IF;
END $$;