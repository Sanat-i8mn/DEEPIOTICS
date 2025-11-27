/*
  # Fix blog_posts featured_image column

  ## Changes
  - Make featured_image column nullable to allow posts without images
  
  ## Rationale
  - Featured images should be optional, not required
  - This allows admins to create text-only blog posts
*/

DO $$
BEGIN
  ALTER TABLE blog_posts ALTER COLUMN featured_image DROP NOT NULL;
END $$;