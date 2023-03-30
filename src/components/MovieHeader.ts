import Logo from '../../assets/logo.png';
import { dispatchCustomEvent } from '../utils/domUtils';

class MovieHeader extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <header>
        <div class="header-container">
          <h1 id="logo">
            <img src="${Logo}" alt="MovieList 로고" />
          </h1>
          <form id="search-form" class="search-box">
            <input id="search-input" type="text" placeholder="검색" required />
            <button class="search-button">검색</button>
          </form>
        </div>
      </header>
    `;
  }

  connectedCallback() {
    this.querySelector<HTMLFormElement>('#search-form')?.addEventListener(
      'submit',
      this.onSubmitSearchForm
    );
    this.querySelector('#logo')?.addEventListener('click', this.onClickLogo);
  }

  onSubmitSearchForm = (e: SubmitEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;
    const [input] = e.target;

    if (!(input instanceof HTMLInputElement)) return;
    dispatchCustomEvent(this, 'search', { query: input.value });
  };

  onClickLogo = () => {
    dispatchCustomEvent(this, 'home');
  };
}

export default MovieHeader;
