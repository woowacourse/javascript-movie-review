import { MovieApiClient } from './apis';
import { Footer, Header, IntersectionObserble, MovieDetailModal, Movies, Toast } from './components';
import { Component } from './components/core';
import { TOAST_TYPE } from './components/Toast';
import { eventHandlerInstance, LocalStorage, LocalStorageMovieRateValueType } from './lib/modules';
import {
  errorStore,
  movieDetailResponseStore,
  movieRateStore,
  moviesResponseStore,
  moviesStore,
  pageStore,
  searchStore,
} from './lib/store';
import { html, isError, isHTMLFormElement, isString } from './lib/utils';

export default class App extends Component<null> {
  override setup() {
    this.getMovie(searchStore.getState(), pageStore.getState());

    new MovieDetailModal({ movieRate: movieRateStore.getState() });
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
    this.fillSlot(new Header(), 'header');
    this.fillSlot(
      new Movies({
        page: pageStore.getState(),
        search: searchStore.getState(),
        error: errorStore.getState(),
      }),
      'movies',
    );
    this.fillSlot(new Footer(), 'footer');
    this.fillSlot(
      new IntersectionObserble({
        callback: async () => {
          await this.getMovie(searchStore.getState(), pageStore.getState() + 1);
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
          page: 1,
        });

        searchStore.setState(String(modalInput.search));
        moviesStore.setState([]);
        await this.getMovie(String(modalInput.search), pageStore.getState());
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
          ...movieRateStore.getState(),
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
