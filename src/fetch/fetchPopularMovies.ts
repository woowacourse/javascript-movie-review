export default async function fetchPopularMovies(page: number) {
  const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  const response = await fetch(popularMovieUrl, options);
  const { results } = await response.json();
  return results;
}
