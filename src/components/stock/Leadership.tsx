
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const leadership = [
  {
    role: "Promoters",
    name: "Key Institutional Investors",
    details: "Key institutional investors include The Vanguard Group and BlackRock Inc., holding significant stakes and influencing corporate governance.",
  },
  {
    role: "CEO",
    name: "Timothy D. Cook",
    details: "As CEO since 2011, Tim Cook has overseen a period of immense growth, focusing on operational efficiency and expanding the services division.",
  },
  {
    role: "Key Executive",
    name: "Jeff Williams (COO)",
    details: "Jeff Williams manages the company's entire supply chain and operations. He is often seen as a potential successor to Tim Cook.",
  },
  {
    role: "Key Executive",
    name: "Luca Maestri (CFO)",
    details: "Luca Maestri is the Chief Financial Officer, responsible for the company's financial strategy, including capital allocation and investor relations.",
  },
  {
    role: "Brand Ambassador",
    name: "Various Artists & Creators",
    details: "The company collaborates with numerous high-profile artists, filmmakers, and developers who act as informal brand ambassadors by using and promoting its products in their work.",
  },
];


const Leadership = ({ ticker }: { ticker: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leadership & Branding</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {leadership.map((person, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <div className="text-left">
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {person.details}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Leadership;
