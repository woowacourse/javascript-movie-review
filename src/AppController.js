import { createHeader } from "./components/header/header";
import { showSkeleton, updateCard } from "./components/movieCard/movieCard";
import { MovieListWrapper } from "./components/movieListWrapper/MovieListWrapper";
import { LAST_PAGE } from "./constants/constant";

export async function fetchPopularMovieList(pageNumber) {
  const liList = loadMovieList();

  try {
    const API_KEY = process.env.API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';
    const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
  
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: API_KEY,
        language: 'ko-KR',
        page: pageNumber.toString(),
      });

    const response = await fetch(popularMovieUrl);
    const popularMovies = await response.json();

    completeMovieList(liList, popularMovies.results);

    return popularMovies.total_pages;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


export async function fetchSearchMovieList(inputValue, pageNumber) {
  const liList = loadMovieList();

  try {
    const API_KEY = process.env.API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';
    const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;
  
    const searchMovieUrl =
    MOVIE_SEARCH_URL +
    '?' +
    new URLSearchParams({
      query: inputValue,
      api_key: API_KEY,
      language: 'ko-KR',
      page: pageNumber.toString(),
    });

    const response = await fetch(searchMovieUrl);
    const searchMovies = await response.json();
    console.log(searchMovies)

    completeMovieList(liList, searchMovies.results);

    return searchMovies.total_pages;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function loadMovieList(){
  const itemList = document.querySelector('.item-list');
  const liList = Array.from({length: 20}, () => showSkeleton())
  itemList.append(...liList);
  return liList;
}

function completeMovieList(liList, movies){
  movies.forEach((movie, index) => {
    updateCard(liList[index], movie);
  })
}

class AppController {
  #currentPage;

  constructor() {
    this.#currentPage = new MovieListWrapper('지금 인기 있는 영화', 'popular');
    

  }
  
  async start() {
    const app = document.querySelector('#app');

    const itemList = document.querySelector('.item-list');
    
    const header = createHeader((inputValue) => {
      itemList.replaceChildren();
      this.#currentPage = new MovieListWrapper(`"${inputValue} 검색 결과`, 'search', inputValue)
      this.#currentPage.create();
    });
    app.prepend(header);
    this.#currentPage.create();
  }
};

export default AppController;
