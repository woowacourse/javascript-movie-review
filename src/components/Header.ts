import EventBroker from '../EventBroker';
import logo from '../images/logo.png';
import stateRender from '../renderer/StateRender';
import { $ } from '../utils/dom';
import { eventThrottle } from '../utils/throttle';

class Header {
  private $header = document.createElement('header');
  private $searchBox: HTMLFormElement;

  constructor($target: HTMLElement) {
    this.init($target);

    this.$header.addEventListener('click', this.onClickEvent.bind(this));

    this.$searchBox = $<HTMLFormElement>('.search-box');

    this.$searchBox.addEventListener('submit', this.onSubmitEvent.bind(this));
  }

  init($target: HTMLElement) {
    $target.insertAdjacentElement('beforeend', this.$header);
    this.render(this.$header);
  }

  render($target: HTMLElement) {
    $target.innerHTML = this.template();
  }

  private async onSubmitEvent(e: SubmitEvent) {
    e.preventDefault();
    if (!(e.currentTarget instanceof HTMLElement)) return;

    const { currentTarget } = e;
    const { value } = $<HTMLInputElement>('.search-input', currentTarget);

    const query = stateRender.getMovieState().query ?? '';

    if (this.checkSearchWordValidation(value, query)) return;

    const updateMovieListEvent = new CustomEvent('updateMovieListEvent', {
      detail: { keyword: value },
    });

    EventBroker.dispatchEvent(updateMovieListEvent);
    // stateRender.renderSearchedMovies(value);/
  }

  private checkSearchWordValidation(value: string, query: string) {
    if (value.length === 0) {
      $<HTMLInputElement>('.search-input').focus();
      return true;
    }

    if (value === query) return true;

    return false;
  }

  private onClickEvent(e: Event) {
    if (!(e.target instanceof HTMLImageElement)) return;

    const { target } = e;
    if (target.id !== 'logo') return;

    eventThrottle(() => stateRender.renderPopularMovies(), 2000)();

    this.$searchBox.reset();
  }

  private template() {
    return `<h1><img id = "logo"src="${logo}" alt="MovieList 로고"/></h1>
      <form class="search-box">
        <input type="text" placeholder="검색" class="search-input" />
        <button class="search-button">검색</button>
      </form>`;
  }
}

export default Header;
