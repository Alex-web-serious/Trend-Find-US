-- Create a public storage bucket for product images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB limit
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Allow anyone to read images from the bucket
create policy "Public read access for product images"
on storage.objects for select
using (bucket_id = 'product-images');

-- Allow anyone to upload images (you can restrict this later if needed)
create policy "Public upload access for product images"
on storage.objects for insert
with check (bucket_id = 'product-images');