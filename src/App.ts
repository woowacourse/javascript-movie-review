import { MovieApiClient } from './apis';
import { Footer, Header, IntersectionObserble, MovieDetailModal, Movies, Toast } from './components';
import { Component } from './components/core';
import { TOAST_TYPE } from './components/Toast';
import { eventHandlerInstance, LocalStorage, LocalStorageMovieRateValueType } from './lib/modules';
import { movieDetailResponseStore, moviesResponseStore, moviesStore } from './lib/store';
import { html, isError, isHTMLFormElement, isString } from './lib/utils';

export interface AppState {
  page: number;
  error: Error | null;
  search: string;
  movieRate: LocalStorageMovieRateValueType;
}

export default class App extends Component<null, AppState> {
  override setup() {
    this.state = {
      page: 1,
      error: null,
      search: '',
      movieRate: LocalStorage.get<LocalStorageMovieRateValueType>('movieRate') ?? {},
    };

    this.getMovie(this.state.search, this.state.page);

    new MovieDetailModal({ movieRate: this.state.movieRate });
  }

  override template() {
    return html`
      <div id="movie-review-wrap">
        <slot name="header"></slot>
        <slot name="movies"></slot>
        <slot name="footer"></slot>
        <slot name="obserable"></slot>
      </div>
    `;
  }

  async onRender() {
    this.fillSlot(
      new Header({
        search: this.state.search,
      }),
      'header',
    );
    this.fillSlot(
      new Movies({
        page: this.state.page,
        search: this.state.search,
        error: this.state.error,
      }),
      'movies',
    );
    this.fillSlot(new Footer(), 'footer');
    this.fillSlot(
      new IntersectionObserble({
        callback: async () => {
          await this.getMovie(this.state.search, this.state.page + 1);
          movieDetailResponseStore.setState(null);
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
          page,
          query: search,
        });
      else moviesResponse = await MovieApiClient.getAll({ page });

      this.setState({
        page,
      });
      moviesResponseStore.setState(moviesResponse);

      const movies = moviesStore.getState();
      moviesStore.setState([...(movies ? movies : []), ...moviesResponse.results]);
    } catch (error) {
      if (isError(error)) this.setState({ error });
      else if (isString(error)) this.setState({ error: new Error(error) });
      else this.setState({ error: new Error('에러 발생') });
    }
  }

  addEventListener() {
    this.addMovieDetailEvents();
    this.addSearchEvents();
    this.addRatingEvents();
    this.addNetworkEvents();
  }

  private addMovieDetailEvents() {
    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: async ({ currentTarget }) => {
        if (!currentTarget.dataset.id) throw new Error('data-id를 설정해주세요.');

        const movieDetailResponse = await MovieApiClient.getDetail({ id: Number(currentTarget.dataset.id) });
        movieDetailResponseStore.setState(movieDetailResponse);
      },
      dataAction: 'movie-detail',
    });
  }

  private addSearchEvents() {
    eventHandlerInstance.addEventListener({
      eventType: 'submit',
      callback: async ({ target }) => {
        if (!isHTMLFormElement(target)) return;

        const formData = new FormData(target);
        const modalInput = Object.fromEntries(formData);

        this.setState({
          search: String(modalInput.search),
          page: 1,
        });

        moviesStore.setState([]);

        await this.getMovie(this.state.search, this.state.page);
      },
      dataAction: 'submit-search',
    });
  }

  private addRatingEvents() {
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
  }

  private addNetworkEvents() {
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
