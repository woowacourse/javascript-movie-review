import { Movie } from '../index.d';

export default class MovieCard {
  #liElement = document.createElement('li');

  #movie;

  constructor(movie: Movie) {
    this.#movie = movie;

    this.#generateMovieItem();
  }

  /* eslint-disable max-lines-per-function */
  #generateMovieItem() {
    const element = ` <a href="#">
       <div class="item-card">
         <img
           class="item-thumbnail"
           src="https:image.tmdb.org/t/p/w220_and_h330_face${this.#movie.poster_path}"
           loading="lazy"
           alt="${this.#movie.title}"
         />
         <p class="item-title">${this.#movie.title}</p>
         <p class="item-score">${this.#movie.vote_average}<img src="./images/star_filled.png" alt="별점" /></p>
       </div>
     </a>`;

    this.#liElement.innerHTML = element;
  }

  get element() {
    return this.#liElement;
  }
}
