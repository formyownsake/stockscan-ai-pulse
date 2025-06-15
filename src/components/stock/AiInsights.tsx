
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ChartBar, FileText, Search } from "lucide-react";

const insights = [
    {
        title: "Stock Potential",
        icon: FileText,
        content: "Based on strong brand loyalty and consistent innovation, this stock shows significant long-term growth potential. Its ecosystem creates a powerful moat."
    },
    {
        title: "Sentiment Analysis",
        icon: Search,
        content: "Overall market sentiment is positive, with recent product announcements driving bullish conversations across social media and news outlets."
    },
    {
        title: "Investment Outlook",
        icon: ArrowUp,
        content: "Analysts recommend a 'Buy' rating, citing robust service revenue growth and expansion into new markets like augmented reality."
    },
    {
        title: "Predicted Trends",
        icon: ChartBar,
        content: "Future growth is likely to be driven by the services division and new hardware categories. Watch for developments in AI integration across its product line."
    }
];

const AiInsights = ({ ticker }: { ticker: string }) => {
  return (
    <div className="space-y-4">
        {insights.map(insight => (
            <Card key={insight.title}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    <insight.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{insight.content}</p>
                </CardContent>
            </Card>
        ))}
    </div>
  );
};

export default AiInsights;
