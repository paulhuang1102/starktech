export const getYearlyGrowthRate = (revenue: number, lastRevenue: number) => {
    return (revenue / lastRevenue - 1) * 100
};