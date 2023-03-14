const API_KEY = '61777263370291e01254d71031583c64';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

export const getApiPopularMovie = async () => {
  const rootData = await fetch(url);

  return rootData.ok ? rootData.json() : rootData.ok;
};
