import type { MoviesResponse } from './types/tmdb';
import MovieService from './domain/MovieService';
import * as dom from './dom';
import { getGenres, getPopularMovies, getSearchMovies } from './api';
import { MAXIMUM_PAGE, POPULAR_TITLE } from './constants';
import CustomStorage from './utils/CustomStorage';

interface State {
  pageNumber: number;
  pageCategory: 'home' | 'search';
  searchQuery: string;
  loading: boolean;
}

type VoteMap = Record<string, number>;

class App {
  voteMapStorage;
  movieService;
  state: State;

  constructor() {
    this.voteMapStorage = new CustomStorage<VoteMap>('voteMap', {});
    this.movieService = new MovieService([]);
    this.state = {
      pageNumber: 1,
      pageCategory: 'home',
      searchQuery: '',
      loading: false,
    };

    this.init();
    this.initMoviePage(POPULAR_TITLE);
    this.updateMoviePage(getPopularMovies, { page: this.state.pageNumber });
  }

  async init() {
    document.body.addEventListener('home', this.onHome);
    document.body.addEventListener('search', this.onSearch);
    document.body.addEventListener('loadMore', this.onLoadMore);
    document.body.addEventListener('clickItem', this.onClickItem);
    document.body.addEventListener('vote', this.onVote);

    const { genres } = await getGenres();
    this.movieService = new MovieService(genres);
  }

  onHome = () => {
    this.state.pageCategory = 'home';
    this.initMoviePage(POPULAR_TITLE);
    this.updateMoviePage(getPopularMovies, { page: this.state.pageNumber });
  };

  onSearch = (e: Event) => {
    this.state.pageCategory = 'search';
    this.state.searchQuery = (<CustomEvent>e).detail.query;
    this.initMoviePage(`"${this.state.searchQuery}" 검색 결과`);
    this.updateMoviePage(getSearchMovies, {
      query: this.state.searchQuery,
      page: this.state.pageNumber,
    });
  };

  onLoadMore = () => {
    if (this.state.pageCategory === 'home') {
      this.updateMoviePage(getPopularMovies, { page: this.state.pageNumber });
    } else {
      this.updateMoviePage(getSearchMovies, {
        query: this.state.searchQuery,
        page: this.state.pageNumber,
      });
    }
  };

  onClickItem = (e: Event) => {
    const { id } = (<CustomEvent>e).detail;

    const movie = this.movieService.findMovie(id);
    const myVote = this.voteMapStorage.getValue()[id] ?? 0;

    if (movie) dom.renderMovieDetailBox(movie, myVote);
    dom.show('.modal');
    document.body.classList.add('fix');
  };

  onVote = (e: Event) => {
    const { id, myVote } = (<CustomEvent>e).detail;

    this.voteMapStorage.setValue({ ...this.voteMapStorage.getValue(), [id]: myVote });
    dom.renderMyVoteArea(id, myVote);
  };

  initMoviePage(title: string) {
    window.scrollTo({ top: 0 });
    this.state.pageNumber = 1;
    this.movieService.resetMovies();

    dom.resetSearchBox();
    dom.renderMoviePage(title);
  }

  async updateMoviePage<Params>(api: (params: Params) => Promise<MoviesResponse>, params: Params) {
    if (this.state.loading) return;
    try {
      const { results, total_pages } = await this.apiWithSkeleton(api)(params);
      const newMovies = this.movieService.cleansingMovies(results);
      if (this.state.pageNumber >= total_pages || this.state.pageNumber >= MAXIMUM_PAGE) {
        dom.hide('#load-sensor');
      }

      this.state.pageNumber += 1;
      this.movieService.concatMovies(newMovies);
      const prevY = window.scrollY;
      dom.renderMovieListItem(newMovies);
      window.scrollTo({ top: prevY });
    } catch (response) {
      if (response instanceof Response) dom.renderErrorPage(response.status);
    }
  }

  apiWithSkeleton<Params>(api: (params: Params) => Promise<MoviesResponse>) {
    return async (params: Params) => {
      dom.show('#skeleton-list');
      this.state.loading = true;

      const { results, total_pages } = await api(params);

      dom.hide('#skeleton-list');
      this.state.loading = false;

      return { results, total_pages };
    };
  }
}

export default App;
