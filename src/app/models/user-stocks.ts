export interface UserStocks {
  stocks: UserStock[];
}

export interface UserStock {
  bought_value: number;
  fullName: string;
  qty: number;
  symbol: string;
}
