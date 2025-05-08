import { StockMeta } from "@/app/types";
import { getYearlyGrowthRate } from "@/app/utils/calulator";
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
        const { data } = json as { data: StockMeta[] };

        // Calculate year-over-year growth rate for monthly revenue
        for (let i = data.length - 1; i >= 0; i--) {
          if (i == 0) {
            data[i].MoM = 0;
            continue;
          }
          for (let j = i - 1; j >= 0; j--) {
            if (
              data[j].revenue_year === data[i].revenue_year - 1 &&
              data[j].revenue_month === data[i].revenue_month
            ) {
              data[i].MoM = getYearlyGrowthRate(
                data[i].revenue,
                data[j].revenue
              );
            }
          }

          if (data[i].MoM === undefined) {
            data[i].MoM = 0;
          }
        }

        setData(json.data);
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
