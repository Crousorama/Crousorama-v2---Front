export interface UserStocks {
  pea: UserStock[];
  titres: UserStock[];
}

export interface UserStock {
  bought_value: number;
  fullName: string;
  qty: number;
  symbol: string;
}
