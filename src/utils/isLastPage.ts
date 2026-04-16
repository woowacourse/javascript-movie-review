export function isLastPage(moviesData: MovieResponse): boolean {
  return moviesData.page === moviesData.total_pages;
}
