import logo from '../../templates/logo.png';

class Header {
  $header = document.createElement('header');

  query;

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$header.classList = '';
    this.$header.innerHTML = this.getTemplate();
  }

  render($target) {
    $target.insertAdjacentElement('afterbegin', this.$header);
  }

  getTemplate() {
    const template = `
      <h1><img id="logo" src=${logo} alt="MovieList 로고" /></h1>
      <form class="search-box">
        <input class="search-input" type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </form>
      `;

    return template;
  }

  bindEvent() {
    this.$header.addEventListener('click', ({ target }) => {
      if (target.id !== 'logo') return;

      document.dispatchEvent(new CustomEvent('renderMovies', { detail: { query: null, page: 1 } }));
    });
  }

  getQuery() {
    const $input = document.querySelector('.search-input');

    return $input.value;
  }

  clearQuery() {
    const $input = document.querySelector('.search-input');

    $input.value = '';
  }
}

export default Header;
