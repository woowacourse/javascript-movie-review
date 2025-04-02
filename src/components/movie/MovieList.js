import Movie from '../../domain/Movie.ts';
import MovieCard from '../movie/MovieCard.js';
import NoResultsMessage from '../search/NoResultsMessage.js';
import DetailModal from '../modal/DetailModal.js';
import MovieListHandler from '../../handlers/MovieListHandler.ts';
import { store } from '../../store/store.js';
export default class MovieList {
  constructor(
    containerSelector,
    moviesData,
    currentPage,
    totalPage,
    movieService,
    movieListHandler,
  ) {
    this.container = document.querySelector(containerSelector);
    this.moviesData = moviesData;
    this.movieService = movieService;
    this.currentPage = parseInt(currentPage);
    this.totalPage = totalPage;
    this.movieListHandler = movieListHandler;
    this.loading = false;
    this.lastQuery = null;
    this.scrollTimer = null;

    this.boundHandleScroll = this.handleScroll.bind(this);
  }

  init() {
    this.loadInitMovie();
    this.addMovieClickEvent();
  }

  setupInfiniteScroll() {
    this.scrollTimer = null;
    window.addEventListener('scroll', this.boundHandleScroll);
  }

  handleScroll() {
    if (this.loading || this.currentPage >= this.totalPage) {
      if (this.currentPage >= this.totalPage) {
        console.log(
          `마지막 페이지 도달: ${this.currentPage}/${this.totalPage}`,
        );
        window.removeEventListener('scroll', this.boundHandleScroll);
      }
      return;
    }
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      if (this.scrollTimer) return;

      this.scrollTimer = setTimeout(() => {
        console.log('로드 요청: 페이지', this.currentPage, '/', this.totalPage);
        if (store.getMode() === 'searchAdd') {
          this.movieListHandler.loadMoreMovies(this.lastQuery);
        } else {
          this.movieListHandler.loadMoreMovies();
        }
        this.scrollTimer = null;
      }, 300);
    }
  }

  addMovieClickEvent() {
    const movieCards = document.querySelectorAll('.thumbnail');
    movieCards.forEach(movieCard => {
      movieCard.addEventListener('click', async () => {
        const movieId = movieCard.dataset.id;
        try {
          const movieDetail = await this.movieService.getMovieDetail(movieId);
          const detailModal = new DetailModal(movieDetail);
          detailModal.showMovieDetails(movieDetail);
        } catch (error) {
          console.error('영화 상세 정보를 가져오는데 실패했습니다:', error);
        }
      });
    });
  }

  loadInitMovie() {
    const noResultsItem = document.querySelector('.no-results');
    if (noResultsItem) {
      noResultsItem.remove();
    }

    if (!this.moviesData || this.moviesData.length === 0) {
      const section = document.querySelector('.movie-select');
      const noResultsItem = new NoResultsMessage();
      section.appendChild(noResultsItem.render());
      return;
    }

    Array.from({ length: this.moviesData.length }).forEach(() => {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      this.container.appendChild(skeletonCard);
    });

    this.container.innerHTML = '';

    this.moviesData.forEach(movieData => {
      const movie = new Movie(movieData);
      const movieCard = new MovieCard(movie);
      this.container.appendChild(movieCard.render());
    });

    this.setupInfiniteScroll();
  }

  static removeMovieList() {
    const movieList = document.querySelector('.thumbnail-list');
    movieList.textContent = '';
  }

  updateMovieListTitle(query) {
    this.resetPageNumber();
    const movieListTitle = document.querySelector('.movie-list-title');
    if (query) {
      movieListTitle.textContent = `"${query}" 검색 결과`;
      return;
    }
    movieListTitle.textContent = '지금 인기 있는 영화';
  }

  addPageNumber() {
    this.currentPage += 1;
  }

  resetPageNumber() {
    this.currentPage = 1;
  }
}
