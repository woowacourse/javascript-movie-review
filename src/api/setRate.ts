export async function setRate(movieId: string, rate: string): Promise<void> {
  localStorage.setItem(movieId, rate);
}
