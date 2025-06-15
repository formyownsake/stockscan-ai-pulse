
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, CircleCheck, CircleX, AlertTriangle } from "lucide-react";

interface Props {
  ticker: string;
}

// MOCK DATA - In a real app, this would come from an API
type MetricStatus = "good" | "warning" | "bad" | "neutral";

interface Metric {
  value: string;
  explanation: string;
  status: MetricStatus;
}

const tier1Metrics: Record<string, Metric> = {
    "P/E Ratio": { value: "27.53", explanation: "Price-to-Earnings ratio. A high P/E could mean the stock is overvalued, but it can also indicate high growth expectations.", status: "warning" },
    "EPS": { value: "6.26", explanation: "Earnings Per Share. This is the portion of a company's profit allocated to each share of common stock. Higher EPS indicates more value.", status: "good" },
    "Revenue Growth (YoY)": { value: "-0.93%", explanation: "Year-over-Year revenue growth. This shows the growth in a company's revenue over the past year. Negative growth can be a red flag.", status: "bad" },
    "ROE": { value: "147.24%", explanation: "Return on Equity. This measures a corporation's profitability in relation to stockholders’ equity. An extremely high ROE can be a good sign, but may also indicate risk or inconsistencies.", status: "good" },
    "Debt-to-Equity": { value: "1.34", explanation: "Total Debt to Shareholder Equity. This indicates how much debt a company is using to finance its assets relative to the value of shareholders’ equity. A high ratio indicates high leverage.", status: "warning" },
};

const tier2Metrics: Record<string, Metric> = {
    "Market Cap": { value: "2.66T", explanation: "Market capitalization. This is the total market value of a company's outstanding shares of stock.", status: "neutral" },
    "Dividend Yield": { value: "0.56%", explanation: "Indicates how much a company pays in dividends each year relative to its stock price.", status: "neutral" },
    "Operating Margin": { value: "29.97%", explanation: "Measures how much profit a company makes on a dollar of sales, after paying for variable costs of production.", status: "good" },
    "Net Profit Margin": { value: "25.31%", explanation: "The ratio of net profits to revenues for a company. It shows how much of each dollar earned by the company is translated into profits.", status: "good" },
    "P/S": { value: "7.09", explanation: "Price-to-Sales ratio. Compares a company’s stock price to its revenues. A low ratio could imply the stock is undervalued, and vice versa.", status: "warning" },
};

const tier3Metrics: Record<string, Metric> = {
    "Current Price": { value: "$172.25", explanation: "The current trading price of the stock.", status: "neutral" },
    "52-week High/Low": { value: "$199.62 / $164.08", explanation: "The highest and lowest price at which a stock has traded during the previous 52 weeks.", status: "neutral" },
    "Dividend Payout Ratio": { value: "15.34%", explanation: "The percentage of earnings paid to shareholders in dividends.", status: "good" },
    "ROA": { value: "28.59%", explanation: "Return on Assets. An indicator of how profitable a company is relative to its total assets.", status: "good" },
    "Current Ratio": { value: "1.02", explanation: "A liquidity ratio that measures a company's ability to pay short-term obligations.", status: "warning" },
    "Quick Ratio": { value: "0.98", explanation: "A liquidity ratio that measures a company's ability to meet its short-term obligations with its most liquid assets.", status: "warning" },
    "EBITDA Margin": { value: "32.65%", explanation: "A measure of a company's operating profit as a percentage of its revenue.", status: "good" },
    "Book Value per Share": { value: "4.21", explanation: "The per share value of a company according to its balance sheet.", status: "neutral" },
    "P/B": { value: "40.91", explanation: "Price-to-Book ratio. Compares a company's market value to its book value.", status: "warning" },
    "PEG Ratio": { value: "2.81", explanation: "Price/Earnings to Growth ratio. A ratio used to determine a stock's value while taking the company's earnings growth into account.", status: "warning" },
    "Beta": { value: "1.28", explanation: "A measure of the volatility—or systematic risk—of a security or portfolio in comparison to the market as a whole.", status: "warning" },
};

const summaryMetrics = [
    { label: "P/E Ratio", value: tier1Metrics["P/E Ratio"].value, status: tier1Metrics["P/E Ratio"].status },
    { label: "EPS", value: tier1Metrics["EPS"].value, status: tier1Metrics["EPS"].status },
    { label: "Revenue Growth", value: tier1Metrics["Revenue Growth (YoY)"].value, status: tier1Metrics["Revenue Growth (YoY)"].status },
    { label: "ROE", value: tier1Metrics["ROE"].value, status: tier1Metrics["ROE"].status },
    { label: "Debt/Equity", value: tier1Metrics["Debt-to-Equity"].value, status: tier1Metrics["Debt-to-Equity"].status },
];

const statusIcons: Record<MetricStatus, React.ReactNode> = {
  good: <CircleCheck className="text-green-500" />,
  warning: <AlertTriangle className="text-amber-500" />,
  bad: <CircleX className="text-red-500" />,
  neutral: <Info className="text-muted-foreground" />,
};

const MetricItem = ({ label, metric }: { label: string, metric: Metric }) => (
  <div className="flex justify-between border-b py-3 text-sm transition-colors hover:bg-accent/50 -mx-6 px-6">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            <p className="text-muted-foreground">{label}</p>
            <Info className="h-3.5 w-3.5 text-muted-foreground/70" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{metric.explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <p className="font-medium">{metric.value}</p>
  </div>
);

const QuickDecisionSummary = () => (
    <Card className="mb-4">
        <CardHeader>
            <CardTitle className="text-xl">Quick Decision Summary</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
                {summaryMetrics.map(({ label, value, status }) => (
                    <div key={label} className="flex justify-between items-center text-sm">
                        <p className="text-muted-foreground">{label}</p>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">{value}</p>
                            {statusIcons[status]}
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const FundamentalAnalysis = ({ ticker }: Props) => {
  return (
    <div className="space-y-4">
        <QuickDecisionSummary />
        <Card>
            <CardHeader>
                <CardTitle>Core Metrics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-1 [&>:last-child]:border-b-0">
                    {Object.entries(tier1Metrics).map(([label, metric]) => (
                        <MetricItem key={label} label={label} metric={metric} />
                    ))}
                </div>
            </CardContent>
        </Card>

        <Accordion type="multiple" className="w-full space-y-4">
            <Card>
                <AccordionItem value="important-metrics" className="border-b-0">
                    <AccordionTrigger className="p-6 text-base font-semibold hover:no-underline">
                        Important Metrics
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                        <div className="space-y-1 -mt-4 [&>:last-child]:border-b-0">
                            {Object.entries(tier2Metrics).map(([label, metric]) => (
                                <MetricItem key={label} label={label} metric={metric} />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Card>
            <Card>
                <AccordionItem value="detailed-metrics" className="border-b-0">
                    <AccordionTrigger className="p-6 text-base font-semibold hover:no-underline">
                        Detailed Metrics
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                        <div className="space-y-1 -mt-4 [&>:last-child]:border-b-0">
                            {Object.entries(tier3Metrics).map(([label, metric]) => (
                                <MetricItem key={label} label={label} metric={metric} />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Card>
        </Accordion>
    </div>
  );
};

export default FundamentalAnalysis;
