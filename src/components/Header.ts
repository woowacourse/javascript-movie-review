import { $ } from '../utils/domSelector';
import EventBroker from '../EventBroker';

class Header {
  private element = $('header');

  constructor() {
    this.render();
    this.addSubmitEventHandler();
  }

  render() {
    const template = `      
      <h1><a href="./"><img src="./assets/logo.png" alt="MovieList 로고" /></a></h1>
      <form class="search-box" id="search-form">
        <input type="search" id="search-input" name="keyword" placeholder="Search" />
        <button type="submit" class="search-button" id="search-button">검색</button>
      </form>`;

    this.element.innerHTML = template;
  }

  addSubmitEventHandler() {
    const $searchForm = $('#search-form');

    $searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!(event.target instanceof HTMLFormElement)) return;

      const formData = new FormData(event.target);
      const keyword = String(formData.get('keyword'));

      const updateMovieListEvent = new CustomEvent('updateMovieListEvent', {
        detail: { keyword: keyword },
      });

      EventBroker.dispatchEvent(updateMovieListEvent);
    });
  }
}

export default Header;
