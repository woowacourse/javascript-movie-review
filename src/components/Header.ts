import { $ } from '../utils/domSelector';

class Header {
  private element = $('header');

  render() {
    const template = `      
      <h1><a href="./"><img src="./assets/logo.png" alt="MovieList 로고" /></a></h1>
      <form class="search-box" id="search-form">
        <input type="search" id="search-input" name="keyword" placeholder="Search" />
        <button type="submit" class="search-button" id="search-button">검색</button>
      </form>`;

    this.element.innerHTML = template;
  }

  addSubmitEventHandler(onSubmitSearchForm: (keyword: string) => void) {
    const $searchForm = $('#search-form');

    $searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!(event.target instanceof HTMLFormElement)) return;

      const formData = new FormData(event.target);
      const keyword = String(formData.get('keyword'));

      onSubmitSearchForm(keyword);
    });
  }
}

export default Header;
