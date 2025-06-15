
import { useNavigate } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  ticker: string;
  name: string;
  price?: string;
}

const Header = ({ ticker, name, price }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowDown className="h-5 w-5 rotate-90" />
          <span className="sr-only">Back</span>
        </Button>
        <div>
          <h1 className="text-xl font-bold">{ticker}</h1>
          <p className="text-sm text-muted-foreground">{name}</p>
        </div>
      </div>
      {price && <div className="text-xl font-bold">${price}</div>}
    </header>
  );
};

export default Header;
