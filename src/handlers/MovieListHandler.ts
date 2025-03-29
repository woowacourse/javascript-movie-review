import Movie from '../domain/Movie.ts';
import MovieList from '../components/movie/MovieList.js';
import MovieService from '../domain/MovieService.ts';
import MovieCard from '../components/movie/MovieCard.js';
import { store } from '../store/store.ts';
export default class MovieListHandler {
  private movieList: MovieList | undefined;
  private movieService: MovieService;
  private store;

  constructor(movieService: MovieService) {
    this.movieService = movieService;
    this.store = store;
  }

  /**
   * 영화 목록을 불러오고 렌더링한다.
   * @param query 검색어 (옵션)
   */
  async loadMovies(query?: string): Promise<void> {
    const moviesData = query
      ? await this.movieService.searchMovies(query, 1)
      : await this.movieService.getPopularResults();

    this.store.setMode(query ? 'searchAdd' : 'popularAdd');

    this.updateMovieListUI(moviesData, query);
  }

  /**
   * 추가 영화를 로드한다. (무한 스크롤)
   * @param query 검색어 (옵션)
   */
  async loadMoreMovies(query?: string): Promise<void> {
    if (!this.movieList || this.movieList.loading) {
      console.log('로딩 중이거나 MovieList가 없어 중단');
      return;
    }

    if (this.movieList.currentPage >= this.movieList.totalPage) {
      console.log(
        `마지막 페이지 도달(${this.movieList.currentPage}/${this.movieList.totalPage}), 추가 로드 중단`,
      );
      return;
    }

    this.movieList.loading = true;
    const pageNumber = this.movieList.currentPage + 1;
    this.movieList.addPageNumber();

    this.addSkeletonCards();

    let actualQuery = query;
    if (!actualQuery && this.store.getMode() === 'searchAdd') {
      actualQuery = this.movieList.lastQuery;
    }

    let newMoviesData =
      this.store.getMode() === 'popularAdd'
        ? await this.movieService.getPopularResults(pageNumber)
        : await this.movieService.searchMovies(actualQuery, pageNumber);

    this.replaceSkeletonsWithMovies(newMoviesData.movies);

    // 마지막 페이지 도달 시 무한 스크롤 이벤트 제거
    if (this.movieList.currentPage >= this.movieList.totalPage) {
      this.cleanupScrollListener();
    }

    this.movieList.loading = false;
  }

  /**
   * UI 업데이트: 영화 목록과 타이틀 갱신
   */
  private updateMovieListUI(
    movieData: {
      movies: Movie[];
      page: number;
      totalPages: number;
    },
    query?: string,
  ): void {
    if (this.movieList && this.movieList.boundHandleScroll) {
      window.removeEventListener('scroll', this.movieList.boundHandleScroll);
    }

    MovieList.removeMovieList();

    this.movieList = new MovieList(
      '.thumbnail-list',
      movieData.movies,
      movieData.page,
      movieData.totalPages,
      this.movieService,
      this,
    );

    if (query) {
      this.movieList.lastQuery = query;
    }

    this.movieList.init();
    this.movieList.updateMovieListTitle(query);
  }

  /**
   * 스켈레톤 카드 추가 (로딩 UI)
   */
  private addSkeletonCards(): void {
    Array.from({ length: 5 }).forEach(() => {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      this.movieList?.container.appendChild(skeletonCard);
    });
  }
  /**
   * 스켈레톤 카드를 실제 영화 카드로 교체
   */
  private replaceSkeletonsWithMovies(movies: Movie[]): void {
    this.movieList?.container
      .querySelectorAll('.skeleton-card')
      .forEach((skeleton: HTMLElement) => skeleton.remove());

    movies.forEach(movie => {
      const movieCard = new MovieCard(movie);
      this.movieList?.container.appendChild(movieCard.render());
    });
  }

  /**
   * 마지막 페이지에 도달했을 때 이벤트 리스너 및 UI 정리
   */
  private cleanupScrollListener(): void {
    console.log(
      `마지막 페이지 도달: ${this.movieList?.currentPage}/${this.movieList?.totalPage}`,
    );

    if (this.movieList?.boundHandleScroll) {
      window.removeEventListener('scroll', this.movieList.boundHandleScroll);
    }

    const loadMoreButton = document.querySelector('.add-movie');
    if (loadMoreButton) loadMoreButton.remove();
  }
}
