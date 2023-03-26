import starFilled from "../../templates/star_filled.png";

import SkeletonCards from "./skeletonCards";

class MovieList {
  $ul = document.createElement("ul");

  skeletonCards;

  constructor($target) {
    this.init();

    this.render($target);

    this.skeletonCards = new SkeletonCards(this.$ul);
  }

  init() {
    this.$ul.classList = "item-list";
  }

  render($target) {
    $target.insertAdjacentElement("beforeend", this.$ul);
  }

  insertMovies(movies) {
    const movieLi = this.getMovieLi(movies);

    this.$ul.insertAdjacentHTML("beforeend", movieLi);
  }

  switchMovies(movies) {
    const movieLi = this.getMovieLi(movies);

    this.$ul.innerHTML = movieLi;
  }

  getMovieLi(movies) {
    const movieLi = movies.reduce((li, movie) => {
      return li + this.getMovieItemTemplate(movie);
    }, "");

    return movieLi;
  }

  getMovieItemTemplate({ title, vote_average, poster_path }) {
    const template = `
      <li>
        <a href="#">
          <div class="item-card">
            ${
              poster_path
                ? `<img
                  class="item-thumbnail skeleton"
                  src="https://image.tmdb.org/t/p/w500/${poster_path}"
                  loading="lazy"
                  alt="${title}"
                />`
                : `<div class="item-thumbnail no-image">
                  <span>No Image</span>
                </div>`
            }
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="${starFilled}" alt="별점" /> ${vote_average?.toFixed(
      1
    )}</p>
          </div>
        </a>
      </li>`;

    return template;
  }

  appearSkeleton() {
    this.skeletonCards.appear();
  }

  hideSkeleton() {
    this.skeletonCards.hide();
  }
}

export default MovieList;
