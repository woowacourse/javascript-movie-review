import './MovieListItem.css';
import StarFilled from '../../image/star_filled.png';
import { $ } from '../../utils/common';

class MovieListItem extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setClickEvent();
  }

  render() {
    const id = this.getAttribute('id');
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const score = this.getAttribute('score');

    this.innerHTML = `
    <li>
      <div id="${id}" class="item-card">
        <img
          class="item-thumbnail skeleton"
          src="https://image.tmdb.org/t/p/w200/${imgUrl}"
          loading="lazy"
          alt="${title}"
        />
        <p class="item-title">${title}</p>
        <p class="item-score">
          ${score}
          <img src="${StarFilled}" alt="별점${score}" />
        </p>
      </div>
    </li>`;
  }

  setClickEvent() {
    this.addEventListener('click', () => {
      $('info-modal').render(this.makeMovieInfo());

      $('.modal').classList.remove('modal--open');
    });
  }

  makeMovieInfo() {
    const id = this.getAttribute('id');
    const title = this.getAttribute('title');
    const imgUrl = this.getAttribute('imgUrl');
    const score = this.getAttribute('score');
    const genre = this.getAttribute('genre').split(',').map(Number);
    const description = this.getAttribute('description');

    return { id, title, imgUrl, score, genre, description };
  }
}

customElements.define('movie-item', MovieListItem);

export default MovieListItem;
