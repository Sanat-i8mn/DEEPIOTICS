/*
  # Fix contact_submissions table constraints

  1. Changes
    - Make project_details_old column nullable (remove NOT NULL constraint)
    - Make ai_service_interest_old column nullable (remove NOT NULL constraint)
  
  2. Notes
    - These columns were renamed from the original columns and should not have NOT NULL constraints
    - This allows new submissions to work without needing to populate old columns
*/

ALTER TABLE contact_submissions 
  ALTER COLUMN project_details_old DROP NOT NULL;

ALTER TABLE contact_submissions 
  ALTER COLUMN ai_service_interest_old DROP NOT NULL;