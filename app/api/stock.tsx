type APIResponse<T> = {
  success: boolean;
  data?: T;
  error?: Error;
};

export const fetchStockById = async (
  id: string
): Promise<APIResponse<{ stock_id: string; stock_name: string }>> => {
  try {
    const res = await fetch(
      `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&data_id=${id}&token=${process.env.NEXT_PUBLIC_FINMIND_API_TOKEN}`
    );

    const json = await res.json();

    return {
      success: true,
      data: json.data[0],
    };
  } catch (error) {
    return {
      success: false,
      error: error as Error,
    };
  }
};
