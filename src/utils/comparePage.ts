export function comparePage(moviesData: MovieResponse | undefined): boolean {
  if (moviesData === undefined) return false;
  return moviesData.page === moviesData.total_pages;
}
