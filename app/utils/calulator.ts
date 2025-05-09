export const getYearlyGrowthRate = (revenue: number, lastRevenue: number) => {
  const rate = (revenue / lastRevenue - 1) * 100;

  // Round the number to the second decimal place
  return Math.round(rate * 100) / 100;
};
