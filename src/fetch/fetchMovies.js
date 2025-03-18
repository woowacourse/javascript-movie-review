export default async function fetchPopularMovies() {
  console.log(import.meta.env.VITE_THDB_API_KEY);
  const popularMovieUrl = 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  const response = await fetch(popularMovieUrl, options);
  const { results } = (await response.json());
  return results;
}
