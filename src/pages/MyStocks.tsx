
import { useMyStocks } from '@/hooks/useMyStocks';
import { getStockData } from '@/lib/stock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Trash2, Home, TrendingUp, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';

const MyStocks = () => {
    const { myStocks, removeStock } = useMyStocks();
    const navigate = useNavigate();

    const savedStocksData = myStocks.map(ticker => getStockData(ticker)).filter((stock): stock is NonNullable<typeof stock> => stock !== null);

    return (
        <div className="flex flex-1 flex-col animate-fade-in">
            <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-card z-10">
                <h1 className="text-xl font-bold">My Stocks</h1>
                <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                </Button>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                {savedStocksData.length > 0 ? (
                    <div className="space-y-3">
                        {savedStocksData.map(stock => (
                            <Card key={stock.ticker} className="overflow-hidden transition-all hover:shadow-md">
                                <div className="p-3 flex items-center justify-between gap-2">
                                    <div 
                                        className="flex-1 cursor-pointer grid gap-1"
                                        onClick={() => navigate(`/stock/${stock.ticker}`)}
                                    >
                                        <p className="font-bold text-base flex items-center">{stock.ticker} <ChevronRight className="w-4 h-4 ml-1 text-muted-foreground" /></p>
                                        <p className="text-xs text-muted-foreground truncate">{stock.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-base">${stock.price}</p>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="text-muted-foreground hover:text-red-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeStock(stock.ticker)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Remove {stock.ticker}</span>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full pt-16">
                        <TrendingUp className="w-16 h-16 mb-4 text-primary/50" strokeWidth={1.5}/>
                        <h2 className="text-xl font-semibold">Your watchlist is empty</h2>
                        <p className="mt-2 max-w-xs">Add stocks to your list to track them here.</p>
                        <Button className="mt-6" onClick={() => navigate('/')}>Find Stocks</Button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyStocks;
