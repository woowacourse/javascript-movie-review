export default async function fetchSearchMovies(query: string, page: number) {
  const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=kr-KO&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  const response = await fetch(searchMovieUrl, options);
  const { results } = await response.json();
  return results;
}
