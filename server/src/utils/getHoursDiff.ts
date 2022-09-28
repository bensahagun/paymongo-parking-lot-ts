export const getHoursDiff = (startDate: number, endDate: number) => {
  const msInHour = 1000 * 60 * 60;
  return Math.ceil(Math.abs(endDate - startDate) / msInHour);
};
