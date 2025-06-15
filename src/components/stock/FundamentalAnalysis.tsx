
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  ticker: string;
}

const metrics = {
  "Current Price": "$172.25",
  "52-week High/Low": "$199.62 / $164.08",
  "Market Cap": "2.66T",
  "P/E Ratio": "27.53",
  "EPS": "6.26",
  "Dividend Yield": "0.56%",
  "Dividend Payout Ratio": "15.34%",
  "ROE": "147.24%",
  "ROA": "28.59%",
  "Debt-to-Equity": "1.34",
  "Current Ratio": "1.02",
  "Quick Ratio": "0.98",
  "Operating Margin": "29.97%",
  "Net Profit Margin": "25.31%",
  "Revenue Growth (YoY)": "-0.93%",
  "EBITDA Margin": "32.65%",
  "Book Value per Share": "4.21",
  "P/B": "40.91",
  "P/S": "7.09",
  "PEG Ratio": "2.81",
  "Beta": "1.28",
};

const MetricItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between border-b py-3 text-sm">
    <p className="text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const FundamentalAnalysis = ({ ticker }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fundamental Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            {Object.entries(metrics).map(([label, value]) => (
                <MetricItem key={label} label={label} value={value} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FundamentalAnalysis;
