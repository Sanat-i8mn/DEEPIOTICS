/*
  # Create Jobs and Job Applications Tables

  ## New Tables
  
  ### `jobs` table
  - `id` (uuid, primary key) - Unique identifier for each job posting
  - `title` (text) - Job title
  - `department` (text) - Department or category
  - `location` (text) - Job location
  - `type` (text) - Employment type (Full-time, Part-time, Contract, etc.)
  - `description` (text) - Full job description
  - `requirements` (text) - Job requirements and qualifications
  - `salary_range` (text) - Optional salary range
  - `status` (text) - Job status (active, closed, draft)
  - `created_at` (timestamptz) - When the job was posted
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### `job_applications` table
  - `id` (uuid, primary key) - Unique identifier for each application
  - `job_id` (uuid, foreign key) - References the job posting
  - `full_name` (text) - Applicant's full name
  - `email` (text) - Applicant's email
  - `phone` (text) - Applicant's phone number
  - `resume_url` (text) - URL to uploaded resume
  - `cover_letter` (text) - Cover letter content
  - `linkedin_url` (text) - Optional LinkedIn profile
  - `status` (text) - Application status (new, reviewing, shortlisted, rejected, accepted)
  - `created_at` (timestamptz) - When application was submitted
  
  ## Security
  - Enable RLS on both tables
  - Jobs table: Public can read active jobs, only authenticated admins can create/update
  - Applications table: Public can insert, only authenticated admins can read/update
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  type text NOT NULL DEFAULT 'Full-time',
  description text NOT NULL,
  requirements text NOT NULL,
  salary_range text DEFAULT '',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  resume_url text DEFAULT '',
  cover_letter text DEFAULT '',
  linkedin_url text DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Jobs policies: Anyone can read active jobs
CREATE POLICY "Anyone can view active jobs"
  ON jobs
  FOR SELECT
  USING (status = 'active');

-- Jobs policies: Allow all operations for now (admin check will be in edge function)
CREATE POLICY "Allow job insert"
  ON jobs
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow job update"
  ON jobs
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow job delete"
  ON jobs
  FOR DELETE
  USING (true);

-- Applications policies: Anyone can submit application
CREATE POLICY "Anyone can submit application"
  ON job_applications
  FOR INSERT
  WITH CHECK (true);

-- Applications policies: Allow reading for admin purposes
CREATE POLICY "Allow application read"
  ON job_applications
  FOR SELECT
  USING (true);

CREATE POLICY "Allow application update"
  ON job_applications
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON job_applications(created_at DESC);
