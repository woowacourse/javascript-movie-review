export const getYear = (date: string) => {
  const year = new Date(date).getFullYear() 
  return year;
};
