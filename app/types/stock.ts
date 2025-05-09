export type StockMeta = {
  date: string;
  stock_id: string;
  country: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
  MoM: number;
};

export type StockInfo = {
  stock_id: string;
  stock_name: string;
  industry_category: string;
};
