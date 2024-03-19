import { Movie } from '../mock/mockingData';

export default class MovieCard {
  #liElement = document.createElement('li');

  #movie;

  constructor(movie: Movie) {
    this.#movie = movie;

    const element = ` <a href="#">
       <div class="item-card">
         <img
           class="item-thumbnail"
           src="https:image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
           loading="lazy"
           alt="${this.#movie.title}"
         />
         <p class="item-title">${this.#movie.title}</p>
         <p class="item-score"><img src="./images/star_filled.png" alt="별점" /> 6.5</p>
       </div>
     </a>`;

    this.#liElement.innerHTML = element;
  }

  get element() {
    return this.#liElement;
  }
}
