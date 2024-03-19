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
  console.log(popularMovies)

  return popularMovies.results;
}

class AppController {
  #currentPage

  constructor() {
    this.#currentPage = 1;
  }
  
  
  async start() {
    const result = await fetchPopularMovieList(this.#currentPage);

    const app = document.querySelector('#app');
    const header = createHeader();
    app.prepend(header);
    const itemList = document.querySelector('.item-list');
    this.updateMovieList(itemList, result);

    const addButton = document.querySelector('.btn.primary.full-width');
    addButton.addEventListener('click', async () => {
      this.#currentPage += 1;
      const result = await fetchPopularMovieList(this.#currentPage);
      this.updateMovieList(itemList, result);
    })

  }

  updateMovieList(itemList = {}, result = []){
    result.forEach((movie) => {
      const movieCard = createMovieCard({movie});
      itemList.appendChild(movieCard);

    })
  }
};

export default AppController;
