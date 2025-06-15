
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const MY_STOCKS_KEY = 'my-stocks';

export const useMyStocks = () => {
    const [myStocks, setMyStocks] = useState<string[]>([]);

    useEffect(() => {
        try {
            const savedStocks = localStorage.getItem(MY_STOCKS_KEY);
            if (savedStocks) {
                setMyStocks(JSON.parse(savedStocks));
            }
        } catch (error) {
            console.error("Failed to load stocks from local storage", error);
            setMyStocks([]);
            toast.error("Could not load your saved stocks.");
        }
    }, []);

    const updateLocalStorage = (stocks: string[]) => {
        try {
            localStorage.setItem(MY_STOCKS_KEY, JSON.stringify(stocks));
        } catch (error) {
            console.error("Failed to save stocks to local storage", error);
            toast.error("There was a problem saving your stocks.");
        }
    };

    const addStock = useCallback((ticker: string) => {
        const upperTicker = ticker.toUpperCase();
        setMyStocks(prevStocks => {
            if (prevStocks.includes(upperTicker)) {
                toast.info(`${upperTicker} is already in your list.`);
                return prevStocks;
            }
            const newStocks = [...prevStocks, upperTicker];
            updateLocalStorage(newStocks);
            toast.success(`${upperTicker} added to My Stocks!`);
            return newStocks;
        });
    }, []);

    const removeStock = useCallback((ticker: string) => {
        const upperTicker = ticker.toUpperCase();
        setMyStocks(prevStocks => {
            const newStocks = prevStocks.filter(t => t !== upperTicker);
            updateLocalStorage(newStocks);
            toast.success(`${upperTicker} removed from My Stocks.`);
            return newStocks;
        });
    }, []);
    
    const isStockSaved = useCallback((ticker: string) => {
        return myStocks.includes(ticker.toUpperCase());
    }, [myStocks]);

    return { myStocks, addStock, removeStock, isStockSaved };
}
