import { Movie } from '../index.d';

import NoImage from '../images/no-image.png';
import StarFilled from '../images/star_filled.png';

interface Props {
  classes?: string[];
  movie?: Movie;
}

export default class MovieCard {
  #liElement = document.createElement('li');

  #movieId!: number;

  #movie;

  constructor({ classes, movie }: Props) {
    if (classes) this.#liElement.classList.add(...classes);

    if (movie) {
      this.#movie = movie;
      this.#movieId = movie.id;

      this.#generateMovieItem(this.#movie);
    } else {
      this.#generateSkeletonMovieItem();
    }
  }

  #generateMovieItem(movie: Movie) {
    const thumbnail = movie.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}` : NoImage;
    const { title } = movie;
    const voteAverage = movie.vote_average.toFixed(2);

    this.#liElement.innerHTML = this.#createMovieItem(thumbnail, title, voteAverage);
  }

  // eslint-disable-next-line max-lines-per-function
  #createMovieItem(thumbnail: any, title: string, voteAverage: string) {
    const element = /* html */ `
      <div class="item-card", data-movieid="${this.#movieId}">
        <img
        class="item-thumbnail"
        src="${thumbnail}"
        loading="lazy"
        alt="${title}"
        />
        <p class="item-title">${title}</p>
        <p class="item-score">${voteAverage}<img src=${StarFilled} alt="별점" class="star-start" /></p>
      </div>
    `;

    return element;
  }

  #generateSkeletonMovieItem() {
    const element = /* html */ ` 
    <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>
    `;

    this.#liElement.innerHTML = element;
  }

  get element() {
    return this.#liElement;
  }
}
