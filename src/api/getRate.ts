export async function getRate(movieId: string): Promise<number> {
  const rate = localStorage.getItem(movieId);
  if (rate === null) return 0;
  return Number(rate);
}
