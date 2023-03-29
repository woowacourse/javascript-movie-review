import logo from '../../templates/logo.png';

class Header {
  $header = document.createElement('header');

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$header.innerHTML = this.getTemplate();
  }

  render($target) {
    $target.insertAdjacentElement('afterbegin', this.$header);
  }

  bindEvent() {
    this.$header.addEventListener('click', ({ target }) => {
      if (target.id !== 'logo') return;
      this.clearQuery();

      document.dispatchEvent(new CustomEvent('renderMovies', { detail: { query: null, page: 1 } }));
    });

    this.$header.addEventListener('submit', (e) => {
      e.preventDefault();

      const query = e.target[0].value;

      document.dispatchEvent(new CustomEvent('renderMovies', { detail: { query, page: 1 } }));
    });
  }

  clearQuery() {
    const $input = document.querySelector('.search-input');

    $input.value = '';
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
}

export default Header;
