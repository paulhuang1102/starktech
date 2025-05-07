interface IMonthRevenue {
    id: string;
    start: string;
    end: string;
}

export const fetchStockById = async (id: string) => {
  const res = await fetch(
    `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&data_id=${id}&token=${process.env.NEXT_PUBLIC_FINMIND_API_TOKEN}`
  );

  const json = await res.json();

  return json;
};

export const fetchStockMonthRevenue = async ({ id, start, end }: IMonthRevenue) => {
  const res = await fetch(
    `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${id}&token=${process.env.NEXT_PUBLIC_FINMIND_API_TOKEN}&start_date=${start}&end_date=${end}`
  );

  const json = await res.json();

  return json;
}