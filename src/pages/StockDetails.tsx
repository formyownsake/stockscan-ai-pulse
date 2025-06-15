
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FundamentalAnalysis from "@/components/stock/FundamentalAnalysis";
import AiInsights from "@/components/stock/AiInsights";
import RecentNews from "@/components/stock/RecentNews";
import Leadership from "@/components/stock/Leadership";
import Header from "@/components/layout/Header";

const mockStockData = {
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: "172.25",
  },
  GOOGL: {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    price: "139.88",
  },
  TSLA: {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    price: "177.77",
  }
};

const StockDetails = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const stockData = ticker ? mockStockData[ticker.toUpperCase() as keyof typeof mockStockData] : null;

  if (!stockData) {
    return (
      <div className="flex flex-col flex-1">
        <Header ticker={ticker || "Unknown"} name="Stock not found" />
        <div className="flex-1 flex items-center justify-center p-4 text-center">
            <p className="text-muted-foreground">Could not find data for ticker: {ticker}. <br/><button onClick={() => navigate('/')} className="text-primary underline mt-2">Go back to search</button></p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col animate-fade-in">
      <Header ticker={stockData.ticker} name={stockData.name} price={stockData.price} />
      <main className="flex-1 overflow-y-auto">
        <Tabs defaultValue="fundamentals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
          </TabsList>
          <div className="p-4">
            <TabsContent value="fundamentals">
              <FundamentalAnalysis ticker={stockData.ticker} />
            </TabsContent>
            <TabsContent value="ai">
              <AiInsights ticker={stockData.ticker} />
            </TabsContent>
            <TabsContent value="news">
              <RecentNews ticker={stockData.ticker} />
            </TabsContent>
            <TabsContent value="leadership">
              <Leadership ticker={stockData.ticker} />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default StockDetails;
