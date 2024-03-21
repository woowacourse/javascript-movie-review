import { formatMovieList } from './../../utils/formatList';
import APIService from '../../domain/services/APIService';
import MovieList from '../MovieList/MovieList';
import Button from '../Button/Button';

class SearchBox {
  currentPage: number = 1;
  totalPage: number = 1;

  searchBox = document.createElement('form');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');

  movieListInstance = new MovieList({ isLoading: true });

  constructor() {
    this.setEvents();
  }

  init() {
    this.searchBox.classList.add('search-box');
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', '검색');

    this.searchButton.classList.add('search-button');
    this.searchButton.textContent = '검색';

    this.searchBox.append(this.searchInput);
    this.searchBox.append(this.searchButton);

    return this.searchBox;
  }

  setEvents() {
    this.searchBox.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.render();
    });
  }

  async render() {
    try {
      const itemList = document.querySelector('.item-list');
      if (!itemList) return;
      itemList.replaceChildren();

      const existingButton = document.querySelector('.button');
      if (!existingButton) return;
      existingButton.remove();

      const popularMovieResult = await APIService.fetchSearchMovies({ query: this.searchInput.value, pageNumber: 1 });

      this.totalPage = popularMovieResult.total_pages;

      const popularMovieList = formatMovieList(popularMovieResult);
      console.log(popularMovieList);

      this.movieListInstance.renderSkeleton();
      this.movieListInstance.newList = popularMovieList; //movie가 있는 상태
      this.movieListInstance.rerender(); //기존의 스켈레톤을 remove하고 render => 무비가 있는 경우에는 렌더링

      this.renderMoreButton();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
      // TODO: Error 처리
    }
  }

  async showNextPage() {
    const existingButton = document.querySelector('.button');
    if (!existingButton) return;
    existingButton.remove();

    this.movieListInstance.renderSkeleton();
    const nextPage = this.currentPage + 1;
    if (nextPage > this.totalPage) return;
    const popularMovieResult = await APIService.fetchSearchMovies({ query: this.searchInput.value, pageNumber: 1 });

    const popularMovieList = formatMovieList(popularMovieResult);
    this.movieListInstance.newList = popularMovieList;
    this.movieListInstance.rerender();
    this.renderMoreButton();
    this.currentPage = nextPage;
    console.log(this.currentPage);
  }

  renderMoreButton() {
    const moreButton = new Button({
      text: '더보기',
      clickEvent: () => {
        this.showNextPage();
      },
      id: 'more-button',
    }).render();

    const container = document.querySelector('.item-view');
    if (!container) return;
    container.append(moreButton);
  }
}

export default SearchBox;
