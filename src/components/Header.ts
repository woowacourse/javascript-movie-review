import { getMovies, MovieApiClient } from '@/apis';
import { DEFAULT_BACK_DROP_URL } from '@/constants';
import { eventHandlerInstance } from '@/modules';
import { movieDetailResponseStore, moviesStore, pageStore, searchStore, serverStore } from '@/store';
import { html, isHTMLFormElement } from '@/utils';
import Component from './core/Component';
import { MovieType } from '@/types';

export default class Header extends Component {
  firstMovie: MovieType | undefined = undefined;

  override setup() {
    this.subsribe([moviesStore, searchStore]);
  }

  override template() {
    this.firstMovie = moviesStore.getState()?.at(0);
    const search = searchStore.getState();

    return html`
      <header class="background-container">
        ${search ? '' : '<div class="overlay" aria-hidden="true"></div>'}
        <div class="top-rated-header">
          <h1 class="logo" data-action="reset">
            <img src="./images/logo.png" alt="MovieList" />
          </h1>
          <form class="top-rated-search" data-action="submit-search">
            <input
              id="top-rated-search-input"
              class="top-rated-search-input"
              placeholder="검색어를 입력하세요"
              name="search"
              value="${search}"
            />
            <button type="submit" class="top-rated-search-button">
              <img src="./images/search.svg" alt="MovieSearch" />
            </button>
          </form>
        </div>
        ${this.firstMovie && !search
          ? `
          <div class="top-rated-container">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${this.firstMovie.vote_average}</span>
            </div>
            <div class="title">${this.firstMovie.title}</div>
            <button class="primary" data-action="show-detail">자세히 보기</button>
          </div>
          `
          : ''}
      </header>
    `;
  }

  override onRender() {
    this.setHeaderBackground();
  }

  override addEventListener() {
    eventHandlerInstance.addEventListener({
      eventType: 'submit',
      callback: async ({ target }) => {
        if (!isHTMLFormElement(target)) return;

        const modalInput = Object.fromEntries(new FormData(target));

        pageStore.setState(1);
        searchStore.setState(String(modalInput.search));
        moviesStore.setState(null);

        await getMovies({ query: searchStore.getState(), page: pageStore.getState() });
      },
      dataAction: 'submit-search',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: () => {
        moviesStore.reset();
        getMovies({ page: 1 });
      },
      dataAction: 'reset',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: async () => {
        const id = this.firstMovie?.id;

        if (!id) return;

        const movieDetailResponse = await serverStore.query({
          queryFn: () => MovieApiClient.getDetail({ id }),
          queryKey: ['movie-detail', id],
        });
        movieDetailResponseStore.setState(movieDetailResponse);
      },
      dataAction: 'show-detail',
    });
  }

  setHeaderBackground() {
    const firstMovie = moviesStore.getState()?.at(0);
    const search = searchStore.getState();

    if (!firstMovie) return;

    if (search) this.element!.style.backgroundImage = '';
    else if (firstMovie.backdrop_path)
      this.element!.style.backgroundImage = `url(${DEFAULT_BACK_DROP_URL}/${firstMovie.backdrop_path})`;
  }
}
