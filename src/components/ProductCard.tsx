import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
  affiliateUrl: string;
  originalPrice?: number;
  dealPrice: number;
  postedDate: string;
}

export const ProductCard = ({
  title,
  imageUrl,
  affiliateUrl,
  originalPrice,
  dealPrice,
  postedDate
}: ProductCardProps) => {
  const postDate = new Date(postedDate);

  // ⭐ TIME AGO FUNCTION
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const intervals: any = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1) {
        return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  const daysSincePost = Math.floor((Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24));
  const showPriceVaryTag = daysSincePost > 5;

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const handleCardClick = () => {
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="animate-fade-in relative w-full">
      <Card
        className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border cursor-pointer group"
        onClick={handleCardClick}
      >
        <div className="p-4">
          
          {/* ⭐ Time Ago UI */}
          <p className="text-xs text-muted-foreground mb-3">
            {timeAgo(postDate)}
          </p>

          <div className="aspect-square overflow-hidden bg-muted rounded-lg mb-4">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          </div>

          <h3 className="line-clamp-2 font-semibold text-base mb-3 min-h-[3rem]">
            {title}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-deal">
                {formatPrice(dealPrice)}
              </p>
              {originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* 🔴 Bottom-right Tag — touching the card */}
      {showPriceVaryTag && (
        <div className="absolute -bottom-0 right-0 flex items-center gap-1">
          <span className="text-[10px] font-semibold bg-red-600 text-white px-2 py-0.5 rounded-md shadow flex items-center gap-1">
            Price May Vary
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 text-white cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Prices and offers may change.
                    <br />
                    Check Amazon for latest price.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
      )}

    </div>
  );
};
