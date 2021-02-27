export interface Stock {
  symbol: string;
  price: number;
  currency: string;
  previous_close: number;
  full_name: string;
  validRanges: string[];
  timestamps: number[];
  prices: {
    low: number[];
    open: number[];
    volume: number[];
    high: number[];
    close: number[];
  };
}
