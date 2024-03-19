import { createHeader } from "./components/header/header";
import { createMovieCard } from "./components/movieCard/movieCard";
import { LAST_PAGE } from "./constants/constant";

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

  return popularMovies;
}

class AppController {
  #currentPage
  #lastPage;

  constructor() {
    this.#currentPage = 1;
    this.#lastPage = LAST_PAGE;
  }
  
  
  async start() {
    const app = document.querySelector('#app');

    const header = createHeader();
    app.prepend(header);

    const itemList = document.querySelector('.item-list');

    const movieList = await fetchPopularMovieList(this.#currentPage);
    this.updateMovieList(itemList, movieList.results);

    const addButton = document.querySelector('.btn.primary.full-width');

    addButton.addEventListener('click', async () => {
      this.#currentPage += 1;
      const movieList = await fetchPopularMovieList(this.#currentPage);
      if(this.#lastPage === this.#currentPage){
        const button = document.querySelector('.item-view > button');
        button.classList.add('none');     
      }
      this.updateMovieList(itemList, movieList.results);
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
