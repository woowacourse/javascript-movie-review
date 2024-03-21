import { Movie } from '../index.d';

interface Props {
  classes?: string[];
  movie?: Movie;
}

export default class MovieCard {
  #liElement = document.createElement('li');

  #movie;

  constructor({ classes, movie }: Props) {
    if (classes) this.#liElement.classList.add(...classes);
    if (movie) {
      this.#movie = movie;
      this.#generateMovieItem(this.#movie);
    } else {
      this.#generateSkeletonMovieItem();
    }
  }

  /* eslint-disable max-lines-per-function */
  #generateMovieItem(movie: Movie) {
    const element = /* html */ ` 
    <a href="#">
       <div class="item-card">
         <img
           class="item-thumbnail"
           src="https:image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}"
           loading="lazy"
           alt="${movie.title}"
         />
         <p class="item-title">${movie.title}</p>
         <p class="item-score">${movie.vote_average}<img src="./images/star_filled.png" alt="별점" /></p>
       </div>
     </a>`;

    this.#liElement.innerHTML = element;
  }

  #generateSkeletonMovieItem() {
    const element = /* html */ ` 
    <a href="#">
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
     </a>`;

    this.#liElement.innerHTML = element;
  }

  get element() {
    return this.#liElement;
  }
}
