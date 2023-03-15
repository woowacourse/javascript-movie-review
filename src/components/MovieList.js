import MovieCard from './MovieCard';

export default class MovieList {
  $element;

  constructor($parent) {
    this.$element = document.createElement('section');
    this.$element.className = 'item-view';

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();

    this.showSkeletonList();

    return this;
  }

  template() {
    return /* html */ ` 
    <h2>지금 인기 있는 영화</h2>
    <ul class="item-list"></ul> 
    <ul class="skeleton-item-list item-list hide">
      ${this.getSkeletonCardsHTML(20)}
    </ul>
    <button id="more-button" class="btn primary full-width">더 보기</button>`;
  }

  async renderMovieCards(movieListPromise) {
    const movieList = await movieListPromise;

    const movieCardsHTML = movieList.reduce((html, movie) => {
      const movieCard = MovieCard(movie);

      return html + movieCard;
    }, '');

    this.hideSkeletonList();
    this.$element.querySelector('.item-list').insertAdjacentHTML('beforeend', movieCardsHTML);
  }

  getSkeletonCardsHTML(count) {
    const skeletonCardHTML = `
    <li>
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>`;

    return skeletonCardHTML.repeat(count);
  }

  showSkeletonList() {
    this.$element.querySelector('.skeleton-item-list').classList.remove('hide');
  }

  hideSkeletonList() {
    this.$element.querySelector('.skeleton-item-list').classList.add('hide');
  }
}
