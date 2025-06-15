
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const newsItems = [
  {
    date: "June 10, 2025",
    summary: "Company unveils major AI-powered updates to its core services, focusing on proactive assistance and deeper device integration."
  },
  {
    date: "May 20, 2025",
    summary: "Reports suggest the company is on track to launch its long-rumored AR glasses by the end of the year, boosting stock outlook."
  },
  {
    date: "April 28, 2025",
    summary: "Quarterly earnings exceed expectations, driven by strong sales in emerging markets and record-breaking services revenue."
  },
  {
    date: "March 5, 2025",
    summary: "A $50 billion share buyback program is announced, signaling confidence in future financial performance."
  }
];

const RecentNews = ({ ticker }: { ticker: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent News Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {newsItems.map((item, index) => (
            <li key={index} className="flex flex-col border-l-2 pl-4 border-primary">
              <p className="font-semibold text-sm">{item.summary}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentNews;
