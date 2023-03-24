import { DetailMovie } from '../type/Movie';
import starIcon from '../assets/star_filled.png';

export default class DetailMovieCard {
  render($target: Element, detailMovie: DetailMovie) {
    $target.innerHTML = this.template(detailMovie);
    this.setEvent();
  }

  template(detailMovieData: DetailMovie) {
    const { id, title, posterPath, voteAverage, overview, genres } = detailMovieData;
    const posterSrc = `https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}`;

    return /* html */ `
    <section id="${id}" class="movie-detail-view">
    <div class="movie-title-wrap">
      <h1 class="movie-title">${title}</h1>
      <button class="modal-close-button">✖</button>
    </div>
    <div class="movie-content-container">
      <div class="movie-img-wrap">
        <img class="movie-img" src=${posterSrc} alt="${title}" />
      </div>
      <div class="movie-info-container">
        <div class="movie-info-text-container">
          <div>
            <span class="movie-info-genre">${genres}</span>
            <img src=${starIcon} alt="star-icon" />
            <span class="movie-info-score">${voteAverage.toFixed(1)}</span>
          </div>
          <div class="movie-info-description">${overview}</div>
        </div>
        <div class="movie-vote-container">
          <span class="movie-vote-title">내 별점</span>
          <div class="movie-vote-button-container">
            <button type="button" data-vote-value="2" class="movie-vote-button">🍕</button>
            <button type="button" data-vote-value="4" class="movie-vote-button">🍕</button>
            <button type="button" data-vote-value="6" class="movie-vote-button">🍕</button>
            <button type="button" data-vote-value="8" class="movie-vote-button">🍕</button>
            <button type="button" data-vote-value="10" class="movie-vote-button">🍕</button>
          </div>
          <span class="movie-vote-score">10 최고에요</span>
        </div>
      </div>
    </div>
    </section>`;
  }

  setEvent() {}
}
