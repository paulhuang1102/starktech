import { useEffect, useState } from "react";

interface IStackDataParam {
  id: string;
  start: string;
  end: string;
}

const useStock = ({ id, start, end }: IStackDataParam) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${id}&token=${process.env.NEXT_PUBLIC_FINMIND_API_TOKEN}&start_date=${start}&end_date=${end}`
        );

        const json = await res.json();

        return json;
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, start, end]);

  return { data, setData, isLoading, error };
};

export default useStock;
