import { LocalStorageMovieRateValueType, MovieDetailResponse, MovieResult, MoviesResponse } from '@/lib/types';
import { MovieApiClient } from './apis';
import { Footer, Header, Movies, MovieDetailModal } from './components';
import { Component } from './components/core';
import { html, isElement, isError, isHTMLFormElement, isString } from './lib/utils';
import eventHandlerInstance from './lib/modules/EventHandler';
import { event } from 'node_modules/cypress/types/jquery';
import LocalStorage from './lib/modules/LocalStorage';

export interface AppState {
  page: number;
  moviesResponse: MoviesResponse | null;
  movies: MovieResult[] | null;
  search: string;
  error: Error | null;
  movieDetailResponse: MovieDetailResponse | null;
}

export default class App extends Component<null, AppState> {
  constructor() {
    super();
  }

  override setup() {
    this.state = {
      page: 1,
      moviesResponse: null,
      movies: null,
      error: null,
      search: '',
      movieDetailResponse: null,
    };
  }

  override template() {
    return html`
      <div id="movie-review-wrap">
        <slot name="header"></slot>
        <slot name="movies"></slot>
        <slot name="footer"></slot>
        <slot name="movie-detail-modal"></slot>
      </div>
    `;
  }

  onRender() {
    this.fillSlot(
      new Header({
        search: this.state.search,
        backgroundImage: this.state.movies?.at(0)?.backdrop_path,
      }).element,
      'header',
    );
    this.fillSlot(
      new Movies({
        movies: this.state.movies,
        totalPages: this.state.moviesResponse?.total_pages ?? 1,
        page: this.state.page,
        search: this.state.search,
        error: this.state.error,
      }).element,
      'movies',
    );
    this.fillSlot(new Footer().element, 'footer');
    if (this.state.movieDetailResponse)
      this.fillSlot(
        new MovieDetailModal({ movieDetailResponse: this.state.movieDetailResponse }).element,
        'movie-detail-modal',
      );
  }

  async getMovie(search: string, page: number) {
    let moviesResponse;

    try {
      if (search)
        moviesResponse = await MovieApiClient.get({
          query: search,
          page,
        });
      else moviesResponse = await MovieApiClient.getAll({ page });
    } catch (error) {
      if (isError(error)) this.setState({ error });
      else if (isString(error)) this.setState({ error: new Error(error) });
      else this.setState({ error: new Error('에러 발생') });
    }

    if (this.state.movies)
      this.setState({
        moviesResponse,
        movies: [...this.state.movies, ...moviesResponse.results],
        page,
      });
    else
      this.setState({
        moviesResponse,
        movies: moviesResponse.results,
        page,
      });
  }

  async dataFetchAsync() {
    await this.getMovie(this.state.search, this.state.page);
  }

  addEventListener() {
    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: async ({ currentTarget }) => {
        if (!currentTarget.dataset.id) throw new Error('data-id를 설정해주세요.');

        const movieDetailResponse = await MovieApiClient.getDetail({ id: Number(currentTarget.dataset.id) });
        this.setState({ movieDetailResponse });
      },
      dataAction: 'movie-detail',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: () => {
        this.setState({ movieDetailResponse: null });
      },
      dataAction: 'close-movie-detail-modal',
      notTriggerDataAction: 'not-close-movie-detail-modal',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'keydown',
      callback: ({ event }) => {
        if (!this.state.movieDetailResponse) return;
        if ((event as KeyboardEvent).key === 'Escape') this.setState({ movieDetailResponse: null });
      },
    });
    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: async () => {
        await this.getMovie(this.state.search, this.state.page + 1);
        this.setState({ movieDetailResponse: null });
      },
      dataAction: 'show-more',
    });
    eventHandlerInstance.addEventListener({
      eventType: 'submit',
      callback: async ({ target }) => {
        if (!isHTMLFormElement(target)) return;

        const formData = new FormData(target);
        const modalInput = Object.fromEntries(formData);

        this.setState({
          search: String(modalInput.search),
          page: 1,
          movies: null,
        });

        await this.dataFetchAsync();
      },
      dataAction: 'submit-search',
    });
    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: ({ target }) => {
        const { id, rate } = target.dataset;

        if (!id || !rate) return;

        LocalStorage.set('movieRate', {
          ...(LocalStorage.get<LocalStorageMovieRateValueType>('movieRate') ?? {}),
          [id]: rate,
        });
      },

      dataAction: 'change-rate',
    });
  }
}
