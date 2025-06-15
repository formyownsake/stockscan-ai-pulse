
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bookmark } from "lucide-react";

const Index = () => {
  const [ticker, setTicker] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (ticker.trim()) {
      navigate(`/stock/${ticker.trim().toUpperCase()}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 bg-background animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">StockScan</h1>
        <p className="text-muted-foreground mb-8">Quick, insightful stock analysis.</p>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter stock ticker (e.g., AAPL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 pl-4 pr-12 text-lg"
          />
          <Button 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10" 
            onClick={handleSearch}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/my-stocks')}
        >
            <Bookmark className="mr-2" />
            My Stocks
        </Button>
      </div>
    </div>
  );
};

export default Index;
