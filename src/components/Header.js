import logo from '../../templates/logo.png';
import Movie from '../domain/Movie';
class Header {
  header = document.createElement('header');

  constructor($target) {
    this.render($target);

    this.header.addEventListener('click', this.onClickEvent);
    this.header.querySelector('.search-box').addEventListener('submit', this.onSubmitEvent);
  }

  render($target) {
    this.header.innerHTML = this.template();
    $target.insertAdjacentElement('beforeend', this.header);
  }

  async onSubmitEvent(e) {
    e.preventDefault();
    const { currentTarget } = e;
    const { value } = currentTarget.querySelector('input');

    if (value.length === 0) alert('1글자 이상 입력해 주셔야 합니다.');

    console.log(await new Movie().findMovies(value));
  }

  async onClickEvent(e) {
    const { target } = e;
    if (target.dataset.type !== 'logo') return;

    console.log(await new Movie().getPopularMovies());
  }

  template() {
    return `<h1><img src="${logo}" alt="MovieList 로고" data-type="logo" /></h1>
      <form class="search-box">
        <input type="text" placeholder="검색" />
        <button data-type="search" class="search-button">검색</button>
      </form>`;
  }
}

export default Header;
