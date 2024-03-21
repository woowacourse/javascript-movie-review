import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import Button from './components/Button/Button';
import APIService, { MovieAPIReturnType } from './domain/services/APIService';
import { formatMovieList } from './utils/formatList';

class App {
  currentPage: number = 1;
  totalPage: number = 1;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;

  constructor() {
    this.init();
    this.movieListInstance = new MovieList({ isLoading: true });
  }

  init() {
    new Header();
    this.renderTitle();

    this.movieListBox.classList.add('item-list');

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.movieListBox);

    this.renderList();
  }

  renderTitle(query?: string) {
    const title = document.createElement('h2');
    if (!query) title.textContent = '지금 인기 있는 영화';
    else title.textContent = `"${query}" 검색 결과`;

    if (!this.itemViewBox) return;
    this.itemViewBox.append(title);
  }

  async renderList() {
    try {
      const popularMovieResult = await APIService.delayedFetchPopularMovies({ pageNumber: this.currentPage });

      this.totalPage = popularMovieResult.total_pages;
      const popularMovieList = formatMovieList(popularMovieResult);

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
    const popularMovieResult = await APIService.delayedFetchPopularMovies({ pageNumber: nextPage });

    const popularMovieList = formatMovieList(popularMovieResult);
    this.movieListInstance.newList = popularMovieList;
    this.movieListInstance.rerender();
    this.renderMoreButton();
    this.currentPage = nextPage;
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

export default App;
