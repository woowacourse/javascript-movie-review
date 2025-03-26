import { LocalStorageMovieRateValueType, MovieDetailResponse, MovieResult, MoviesResponse } from '@/lib/types';
import { MovieApiClient } from './apis';
import { Footer, Header, MovieDetailModal, Movies, IntersectionObserble, Toast } from './components';
import { Component } from './components/core';
import eventHandlerInstance from './lib/modules/EventHandler';
import LocalStorage from './lib/modules/LocalStorage';
import { html, isError, isHTMLFormElement, isString } from './lib/utils';
import { TOAST_TYPE } from './components/Toast';

export interface AppState {
  page: number;
  moviesResponse: MoviesResponse | null;
  movies: MovieResult[] | null;
  search: string;
  error: Error | null;
  movieDetailResponse: MovieDetailResponse | null;
  movieRate: LocalStorageMovieRateValueType;
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
      movieRate: LocalStorage.get<LocalStorageMovieRateValueType>('movieRate') ?? {},
    };

    this.getMovie(this.state.search, this.state.page);
  }

  override template() {
    return html`
      <div id="movie-review-wrap">
        <slot name="header"></slot>
        <slot name="movies"></slot>
        <slot name="footer"></slot>
        <slot name="movie-detail-modal"></slot>
        <slot name="obserable"></slot>
      </div>
    `;
  }

  async onRender() {
    this.fillSlot(
      new Header({
        search: this.state.search,
        movie: this.state.movies?.at(0),
      }),
      'header',
    );
    this.fillSlot(
      new Movies({
        movies: this.state.movies,
        totalPages: this.state.moviesResponse?.total_pages ?? 1,
        page: this.state.page,
        search: this.state.search,
        error: this.state.error,
      }),
      'movies',
    );
    this.fillSlot(new Footer(), 'footer');
    if (this.state.movieDetailResponse)
      this.fillSlot(
        new MovieDetailModal({ movieDetailResponse: this.state.movieDetailResponse, movieRate: this.state.movieRate }),
        'movie-detail-modal',
      );
    this.fillSlot(
      new IntersectionObserble({
        callback: async () => {
          await this.getMovie(this.state.search, this.state.page + 1);
          this.setState({ movieDetailResponse: null });
        },
        id: 'movie-more',
      }),
      'obserable',
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

    this.setState({
      moviesResponse,
      movies: [...(this.state.movies ? this.state.movies : []), ...moviesResponse.results],
      page,
    });
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
      dataAction: 'close-movie-detail-modal-outside',
      notTriggerDataAction: 'not-close-movie-detail-modal',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: () => {
        this.setState({ movieDetailResponse: null });
      },
      dataAction: 'close-movie-detail-modal-button',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'keydown',
      callback: ({ event }) => {
        if (!this.state.movieDetailResponse) return;
        if ((event as KeyboardEvent).key === 'Escape') this.setState({ movieDetailResponse: null });
      },
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

        await this.getMovie(this.state.search, this.state.page);
      },
      dataAction: 'submit-search',
    });
    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: ({ target }) => {
        const { id, rate } = target.dataset;

        if (!id || !rate) return;

        const newMovieRate = {
          ...this.state.movieRate,
          [id]: Number(rate),
        };

        LocalStorage.set('movieRate', newMovieRate);
        this.setState({ movieRate: newMovieRate });
      },

      dataAction: 'change-rate',
    });
    eventHandlerInstance.addEventListener({
      eventType: 'offline',
      callbackWindow: () => {
        new Toast({ message: '네트워크 오프라인이 감지되었습니다.', type: TOAST_TYPE.error }).show();
      },
    });
    eventHandlerInstance.addEventListener({
      eventType: 'online',
      callbackWindow: () => {
        new Toast({ message: '네트워크가 연결되었습니다.', type: TOAST_TYPE.success }).show();
      },
    });
  }
}
