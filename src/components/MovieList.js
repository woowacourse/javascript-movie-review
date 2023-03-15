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

    return this;
  }

  async renderMovieCards(movieListPromise) {
    const movieList = await movieListPromise;

    const movieCardsHTML = movieList.reduce((html, movie) => {
      const movieCard = MovieCard(movie);

      return html + movieCard;
    }, '');

    this.$element.querySelector('.item-list').insertAdjacentHTML('beforeend', movieCardsHTML);
  }

  template() {
    return /* html */ ` 
    <h2>지금 인기 있는 영화</h2>
    <ul class="item-list"></ul>
    <button class="btn primary full-width">더 보기</button>`;
  }
}
