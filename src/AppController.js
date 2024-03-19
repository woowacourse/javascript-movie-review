import { createHeader } from "./components/header/header";
import { createMovieCard } from "./components/movieCard/movieCard";

async function fetchPopularMovieList(pageNumber) {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';
    const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
    const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

  const popularMovieUrl =
    POPULAR_MOVIES_URL +
    '?' +
    new URLSearchParams({
      api_key: process.env.API_KEY,
      language: 'ko-KR',
      page: pageNumber.toString(),
    });
  const response = await fetch(popularMovieUrl);
  const popularMovies = await response.json();

  return popularMovies.results;
}

const AppController = {
  async start() {
    const result = await fetchPopularMovieList(1);

    const app = document.querySelector('#app');
    const header = createHeader();
    app.prepend(header);

    const ul = document.querySelector('.item-list');
    result.forEach((movie) => {
      const li = createMovieCard({movie});
      ul.appendChild(li);

    })
  },
};

export default AppController;
