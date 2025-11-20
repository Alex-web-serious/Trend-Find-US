import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: string;
  title: string;
  image_url: string;
  affiliate_url: string;
  original_price: number | null;
  deal_price: number;
  posted_date: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ⭐ Debounce search for smoother typing
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ⭐ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("posted_date", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ⭐ Search filter
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}
      <header className="bg-secondary text-secondary-foreground py-8 shadow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Amazon Deals Hub</h1>
          <p className="text-sm md:text-base mt-2 opacity-80">
            Discover the best deals updated daily
          </p>
        </div>
      </header>

      {/* -------------------------------------------------- */}
      {/* SEARCH BAR */}
      {/* -------------------------------------------------- */}
      <div className="container mx-auto px-4 py-6 max-w-lg space-y-3">
        <Card className="shadow-md border rounded-full">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5"
            />

            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                h-12
                w-full
                pl-12
                pr-4
                rounded-full
                text-base
                border-0
                focus-visible:ring-0
                focus-visible:ring-offset-0
              "
            />
          </div>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          As an Amazon Associate, I earn from qualifying purchases.
        </p>
      </div>

      {/* -------------------------------------------------- */}
      {/* PRODUCTS GRID */}
      {/* -------------------------------------------------- */}
      <div className="container mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-16 text-muted-foreground">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {debouncedSearch ? "No products found" : "No products available"}
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in"
            style={{ animationDuration: "0.4s" }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.image_url}
                affiliateUrl={product.affiliate_url}
                originalPrice={product.original_price || undefined}
                dealPrice={product.deal_price}
                postedDate={product.posted_date}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
