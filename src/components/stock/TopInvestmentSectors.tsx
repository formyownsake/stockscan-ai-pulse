
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Cpu, Wind, Landmark, Shield, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Types
type Sentiment = 'positive' | 'neutral' | 'negative';

interface Stock {
  ticker: string;
  price: string;
  change: string;
  volume: string;
}

interface Sector {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  performanceSummary: string;
  keyStocks: Stock[];
  recentNews: string[];
  sentiment: Sentiment;
}

// Mock Data
const mockSectorsData: Sector[] = [
  {
    name: 'Artificial Intelligence',
    icon: Cpu,
    performanceSummary: 'Strong growth driven by advancements in generative AI and enterprise adoption.',
    keyStocks: [
      { ticker: 'NVDA', price: '$887.89', change: '+1.25%', volume: '45.6M' },
      { ticker: 'MSFT', price: '$429.01', change: '+0.78%', volume: '22.1M' },
      { ticker: 'GOOGL', price: '$139.88', change: '-0.12%', volume: '30.3M' },
    ],
    recentNews: [
      'New AI models show unprecedented capabilities.',
      'Regulatory discussions around AI ethics intensify.',
      'Major tech firms announce massive investments in AI R&D.',
    ],
    sentiment: 'positive',
  },
  {
    name: 'Clean Energy',
    icon: Wind,
    performanceSummary: 'Mixed performance with long-term potential supported by global green initiatives.',
    keyStocks: [
      { ticker: 'NEE', price: '$61.50', change: '-0.50%', volume: '15.2M' },
      { ticker: 'ENPH', price: '$120.34', change: '+2.10%', volume: '8.9M' },
      { ticker: 'FSLR', price: '$155.70', change: '-1.15%', volume: '4.5M' },
    ],
    recentNews: [
      'Government subsidies boost solar panel installations.',
      'Volatility in raw material prices impacts profitability.',
      'Breakthrough in battery storage technology announced.',
    ],
    sentiment: 'neutral',
  },
  {
    name: 'Financials',
    icon: Landmark,
    performanceSummary: 'Stable performance with potential headwinds from interest rate uncertainty.',
    keyStocks: [
      { ticker: 'JPM', price: '$198.20', change: '+0.25%', volume: '12.8M' },
      { ticker: 'BAC', price: '$37.95', change: '-0.80%', volume: '55.7M' },
      { ticker: 'WFC', price: '$60.11', change: '+0.10%', volume: '25.1M' },
    ],
    recentNews: [
      'Banking sector shows resilience in stress tests.',
      'Fintech disruption continues to challenge traditional banks.',
      'Analysts are divided on the Fed\'s next move.',
    ],
    sentiment: 'neutral',
  },
    {
    name: 'Defense',
    icon: Shield,
    performanceSummary: 'Increased geopolitical tensions are driving strong demand and record backlogs.',
    keyStocks: [
      { ticker: 'LMT', price: '$455.60', change: '+0.95%', volume: '1.5M' },
      { ticker: 'RTX', price: '$102.10', change: '+1.10%', volume: '7.8M' },
      { ticker: 'NOC', price: '$440.88', change: '+0.70%', volume: '1.2M' },
    ],
    recentNews: [
      'Nations increase defense budgets amid global uncertainty.',
      'Major contracts awarded for next-generation aircraft.',
      'Cybersecurity for defense systems becomes a top priority.',
    ],
    sentiment: 'positive',
  },
];

// Components
const SentimentBadge = ({ sentiment }: { sentiment: Sentiment }) => {
  const sentimentConfig = {
    positive: {
      icon: <TrendingUp className="h-4 w-4" />,
      text: 'Positive',
      className: 'bg-green-500/20 text-green-400 border-green-500/30',
    },
    neutral: {
      icon: <Minus className="h-4 w-4" />,
      text: 'Neutral',
      className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    },
    negative: {
      icon: <TrendingDown className="h-4 w-4" />,
      text: 'Negative',
      className: 'bg-red-500/20 text-red-400 border-red-500/30',
    },
  };

  const { icon, text, className } = sentimentConfig[sentiment];

  return (
    <Badge variant="outline" className={`gap-1.5 ${className}`}>
      {icon}
      <span>{text}</span>
    </Badge>
  );
};

const SectorCard = ({ sector }: { sector: Sector }) => {
  const Icon = sector.icon;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>{sector.name}</CardTitle>
            <CardDescription className="mt-1">{sector.performanceSummary}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">Key Stocks / ETFs</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sector.keyStocks.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell className="font-medium">{stock.ticker}</TableCell>
                  <TableCell className="text-right">{stock.price}</TableCell>
                  <TableCell className={`text-right ${stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change}
                  </TableCell>
                  <TableCell className="text-right">{stock.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
            <h4 className="font-semibold text-sm mb-2">Recent News</h4>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                {sector.recentNews.map((news, index) => (
                    <li key={index}>{news}</li>
                ))}
            </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <h4 className="font-semibold text-sm">Market Sentiment</h4>
        <SentimentBadge sentiment={sector.sentiment} />
      </CardFooter>
    </Card>
  );
};


const TopInvestmentSectors = () => {
  return (
    <div className="space-y-4">
      {mockSectorsData.map((sector) => (
        <SectorCard key={sector.name} sector={sector} />
      ))}
    </div>
  );
};

export default TopInvestmentSectors;
