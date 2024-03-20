import { searchMoviesByTitle } from '../apis/movie';
import { dom } from '../utils/dom';
import Header from './header/Header';
import MovieListContainer from './movieListContainer/MovieListContainer';

class App {
  $target: HTMLElement;
  movieListContainer: MovieListContainer;

  constructor() {
    this.$target = document.createElement('div');
    this.$target.id = 'app';
    this.$target.innerHTML = this.template();
    this.movieListContainer = new MovieListContainer();

    this.render();
    this.setEvent();
  }

  template() {
    return `
    <main>
      <section class="item-view">
        <h2 id="title">지금 인기 있는 영화</h2>
        <slot class="slot-movie-list"></slot>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      </section>
    </main>
    `;
  }

  render() {
    const header = this.#createHeader();

    const $title = dom.getElement(this.$target, 'h2');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const title = urlSearchParams.get('title') ?? '';

    $title.textContent = title ? `"${title}" 검색 결과` : '지금 인기 있는 영화';
    const slotMovieList = dom.getElement(this.$target, '.slot-movie-list');

    slotMovieList.replaceWith(this.movieListContainer.$target);
    this.$target.prepend(header.$target);
  }

  setEvent() {
    const $moreButton = dom.getElement<HTMLButtonElement>(this.$target, '#more-button');
    $moreButton.addEventListener('click', this.handleClickMoreMovies.bind(this));
  }

  #createHeader() {
    return new Header({
      imageSrc: './images/logo.png',
      onSubmit: async (e: SubmitEvent) => {
        e.preventDefault();
        this.movieListContainer.page = 1;

        const $input = dom.getElement<HTMLInputElement>(this.$target, '#search-input');
        const movies = await searchMoviesByTitle($input.value, this.movieListContainer.page);

        const $title = dom.getElement(this.$target, 'h2');
        $title.textContent = `"${$input.value}" 검색 결과`;
        this.movieListContainer.paint(movies);

        history.pushState('', '', `?mode=search&title=${$input.value}`);
      },
    });
  }

  handleClickMoreMovies() {
    this.movieListContainer.attach();
  }
}
export default App;
