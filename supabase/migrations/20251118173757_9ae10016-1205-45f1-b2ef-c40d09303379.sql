-- Create products table for Amazon affiliate site
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  original_price DECIMAL(10,2),
  deal_price DECIMAL(10,2) NOT NULL,
  posted_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (all visitors can view products)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_products_posted_date ON public.products(posted_date DESC);