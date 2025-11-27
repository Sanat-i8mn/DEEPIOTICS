/*
  # Create Blog Images Storage Bucket

  1. Storage
    - Create public bucket `blog-images` for storing blog featured images
    - Set up policies to allow:
      - Authenticated users (admins) to upload images
      - Public read access for displaying images

  2. Security
    - Only authenticated users can upload/delete images
    - Everyone can view images (public access)
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can update blog images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

CREATE POLICY "Public users can view blog images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-images');
