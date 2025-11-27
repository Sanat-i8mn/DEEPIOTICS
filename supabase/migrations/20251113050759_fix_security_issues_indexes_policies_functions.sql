/*
  # Fix Security Issues

  ## Changes Made

  ### 1. Remove Unused Indexes
  - Drop `idx_newsletter_subscribers_email` from `newsletter_subscribers`
  - Drop `idx_newsletter_subscribers_subscribed_at` from `newsletter_subscribers`
  - Drop `idx_newsletter_email` from `newsletter_subscriptions`
  - Drop `idx_newsletter_active` from `newsletter_subscriptions`
  - Drop `idx_contact_email` from `contact_submissions`
  - Drop `idx_contact_status` from `contact_submissions`
  - Drop `idx_applications_status` from `job_applications`
  - Drop `idx_applications_created_at` from `job_applications`
  - Drop `idx_blog_posts_published_date` from `blog_posts`

  ### 2. Fix Duplicate RLS Policies on blog_posts
  - Remove overlapping policies for authenticated users
  - Keep single restrictive policy for each operation

  ### 3. Fix Function Search Path Mutability
  - Drop and recreate functions with proper search_path
  - Recreate triggers after function updates
*/

-- Remove unused indexes
DROP INDEX IF EXISTS idx_newsletter_subscribers_email;
DROP INDEX IF EXISTS idx_newsletter_subscribers_subscribed_at;
DROP INDEX IF EXISTS idx_newsletter_email;
DROP INDEX IF EXISTS idx_newsletter_active;
DROP INDEX IF EXISTS idx_contact_email;
DROP INDEX IF EXISTS idx_contact_status;
DROP INDEX IF EXISTS idx_applications_status;
DROP INDEX IF EXISTS idx_applications_created_at;
DROP INDEX IF EXISTS idx_blog_posts_published_date;

-- Fix duplicate RLS policies on blog_posts table
-- Drop the conflicting policies first
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all blog posts" ON blog_posts;

-- Create a single comprehensive SELECT policy
CREATE POLICY "Users can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Fix function search path mutability issues
-- Drop triggers first, then functions, then recreate with proper search_path

-- Drop triggers
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
DROP TRIGGER IF EXISTS update_jobs_updated_at ON jobs;

-- Drop functions
DROP FUNCTION IF EXISTS update_blog_posts_updated_at() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Recreate update_blog_posts_updated_at with fixed search_path
CREATE FUNCTION update_blog_posts_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate update_updated_at_column with fixed search_path
CREATE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
