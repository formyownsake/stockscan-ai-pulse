
export const mockStockData = {
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

export type Stock = typeof mockStockData[keyof typeof mockStockData];

export const getSuggestions = (searchText: string) => {
  const lowerSearchText = searchText.toLowerCase();
  if (!lowerSearchText) return [];
  return Object.values(mockStockData).filter(stock => 
    stock.ticker.toLowerCase().includes(lowerSearchText) || 
    stock.name.toLowerCase().includes(lowerSearchText)
  );
};

export const getStockData = (ticker: string) => {
    return mockStockData[ticker.toUpperCase() as keyof typeof mockStockData] || null;
}
