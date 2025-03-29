import Movie from '../domain/Movie.ts';
import MovieList from '../components/movie/MovieList.js';
import MovieService from '../domain/MovieService.ts';
import MovieCard from '../components/movie/MovieCard.js';
import { store } from '../store/store.ts';
import { APIResponse, MovieResponse } from '../domain/tmdbApi.ts';

export default class MovieListHandler {
  private movieList: MovieList | undefined;
  private movieService: MovieService;

  constructor(movieService: MovieService) {
    this.movieService = movieService;
  }

  async initMovieList(query?: string) {
    const moviesData = query
      ? await this.movieService.searchMovies(query, 1)
      : await this.movieService.getPopularResults();

    this.updateMovieList(moviesData, query);
    this.movieList?.updateMovieListTitle(query);
  }

  private updateMovieList(
    movieData: {
      movies: Movie[];
      page: number;
      totalPages: number;
    },
    query?: string,
  ) {
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
  }

  async handleLoadMore(query?: string) {
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

    const pageNumber = this.movieList?.currentPage + 1;

    this.movieList?.addPageNumber();

    Array.from({ length: 5 }).forEach(() => {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      this.movieList?.container.appendChild(skeletonCard);
    });

    let actualQuery = query;
    if (!actualQuery && store.getMode() === 'searchAdd') {
      actualQuery = this.movieList.lastQuery;
    }

    let newMoviesData: {
      movies: Movie[];
      page: number;
      totalPages: number;
    };
    if (store.getMode() === 'popularAdd') {
      console.log(`인기 영화 로드: 페이지 ${pageNumber}`);
      newMoviesData = await this.movieService.getPopularResults(pageNumber);
    } else {
      console.log(`검색 결과 로드: 쿼리=${actualQuery}, 페이지=${pageNumber}`);
      newMoviesData = await this.movieService.searchMovies(
        actualQuery,
        pageNumber,
      );
    }

    this.movieList?.container
      .querySelectorAll('.skeleton-card')
      .forEach((skeleton: HTMLElement) => skeleton.remove());

    newMoviesData.movies.forEach(movie => {
      const movieCard = new MovieCard(movie);
      this.movieList?.container.appendChild(movieCard.render());
    });

    if (this.movieList.currentPage >= this.movieList.totalPage) {
      console.log(
        `마지막 페이지 도달: ${this.movieList.currentPage}/${this.movieList.totalPage}`,
      );
      if (this.movieList.boundHandleScroll) {
        window.removeEventListener('scroll', this.movieList.boundHandleScroll);
      }
      const loadMoreButton = document.querySelector('.add-movie');
      if (loadMoreButton) loadMoreButton.remove();
    }

    this.movieList.loading = false;
  }

  async handleSearch(query: string) {
    if (!query.trim()) {
      await this.initMovieList();
      return;
    }

    MovieList.removeMovieList();

    store.setMode('searchAdd');
    const movies = await this.movieService.searchMovies(query);
    this.movieList = new MovieList(
      '.thumbnail-list',
      movies,
      1,
      500,
      this.movieService,
      this,
    );
    this.movieList.lastQuery = query;
    this.movieList.init();
  }
}
