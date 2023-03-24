import logo from '../images/logo.png';
import stateRender from '../renderer/StateRender';

class Header {
  #$header = document.createElement('header');
  #$searchBox: HTMLFormElement | null;

  constructor($target: HTMLElement) {
    this.init($target);

    this.#$header.addEventListener('click', this.#onClickEvent.bind(this));

    this.#$searchBox = this.#$header.querySelector('.search-box');
    if (!(this.#$searchBox instanceof HTMLFormElement)) return;

    this.#$searchBox.addEventListener('submit', this.#onSubmitEvent.bind(this));
  }

  init($target: HTMLElement) {
    $target.insertAdjacentElement('beforeend', this.#$header);
    this.render(this.#$header);
  }

  render($target: HTMLElement) {
    $target.innerHTML = this.#template();
  }

  async #onSubmitEvent(e: SubmitEvent) {
    e.preventDefault();
    if (!(e.currentTarget instanceof HTMLElement)) return;

    const { currentTarget } = e;
    const { value } = currentTarget.querySelector('input') as HTMLInputElement;

    const query = stateRender.getMovieState().query ?? '';

    if (this.#checkSearchWordValidation(value, query)) return;

    stateRender.renderSearchedMovies(value);
  }

  #checkSearchWordValidation(value: string, query: string) {
    if (!this.#$searchBox) return true;

    if (value.length === 0) {
      this.#$searchBox.querySelector<HTMLInputElement>('input')?.focus();
      return true;
    }

    if (value === query) return true;

    return false;
  }

  #onClickEvent(e: Event) {
    if (!(e.target instanceof HTMLElement)) return;
    const { target } = e;

    if (target.dataset.type !== 'logo') return;

    stateRender.renderPopularMovies();

    if (this.#$searchBox instanceof HTMLFormElement) {
      this.#$searchBox.reset();
    }
  }

  #template() {
    return `<h1><img src="${logo}" alt="MovieList 로고" data-type="logo" /></h1>
      <form class="search-box">
        <input type="text" placeholder="검색" class="search-input" />
        <button data-type="search" class="search-button">검색</button>
      </form>`;
  }
}

export default Header;
