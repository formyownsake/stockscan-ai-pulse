import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FundamentalAnalysis from "@/components/stock/FundamentalAnalysis";
import AiInsights from "@/components/stock/AiInsights";
import RecentNews from "@/components/stock/RecentNews";
import Leadership from "@/components/stock/Leadership";
import Header from "@/components/layout/Header";
import TopInvestmentSectors from "@/components/stock/TopInvestmentSectors";

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
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    price: "429.01",
  }
};

const getSuggestions = (searchText: string) => {
  const lowerSearchText = searchText.toLowerCase();
  if (!lowerSearchText) return [];
  return Object.values(mockStockData).filter(stock => 
    stock.ticker.toLowerCase().includes(lowerSearchText) || 
    stock.name.toLowerCase().includes(lowerSearchText)
  );
};

const StockDetails = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const stockData = ticker ? mockStockData[ticker.toUpperCase() as keyof typeof mockStockData] : null;
  const suggestions = (!stockData && ticker) ? getSuggestions(ticker) : [];

  if (!stockData) {
    return (
      <div className="flex flex-col flex-1">
        <Header ticker={ticker || "Unknown"} name={suggestions.length > 0 ? "Did you mean...?" : "Stock not found"} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            {suggestions.length > 0 ? (
            <div className="w-full max-w-md">
              <p className="text-muted-foreground mb-4">We couldn't find a direct match for "{ticker}". Did you mean one of these?</p>
              <ul className="space-y-2 text-left bg-card rounded-lg border p-2">
                {suggestions.map(stock => (
                  <li key={stock.ticker}>
                    <button 
                      onClick={() => navigate(`/stock/${stock.ticker}`)} 
                      className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors flex justify-between items-center"
                    >
                      <div>
                        <span className="font-bold text-primary">{stock.ticker}</span>
                        <span className="text-sm text-muted-foreground ml-2">{stock.name}</span>
                      </div>
                      <span className="text-sm font-semibold">${stock.price}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/')} className="text-primary underline mt-6 text-sm">Or go back to search</button>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground">Could not find data for ticker: {ticker}.</p>
              <button onClick={() => navigate('/')} className="text-primary underline mt-2">Go back to search</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col animate-fade-in">
      <Header ticker={stockData.ticker} name={stockData.name} price={stockData.price} />
      <main className="flex-1 overflow-y-auto">
        <Tabs defaultValue="fundamentals" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
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
            <TabsContent value="sectors">
              <TopInvestmentSectors />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default StockDetails;
