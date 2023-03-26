import { Movie } from "../../type";
import { onClickModalCloseButton } from "./modalHandler";

export default class MovieModal extends HTMLElement {

  constructor() {
    super();
  }

  render(movie: Movie) {
    this.innerHTML = `
    <div class="modal align-items-center">
      <div class="modal-content modal-font">
        <div class="d-flex justify-content-between align-items-center">
          <div></div>
          <div><h2 id="modal-title">${movie.title}</h2></div>
          <button id="modal-close-button">X</button>
        </div>
        <hr>
        <div class="d-flex justify-content-between m-3">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w500/${movie.poster}"
              class="modal-img mx-2"
            >
          </div>
          <div class="mx-3 d-flex align-content-between flex-wrap">
            <div>
              <div class="d-flex align-items-center">
                <div>
                ${movie.genres.join(', ')}
                </div>
                <div class="d-flex align-items-center mx-1">
                  <img
                    src="./assets/star_${movie.ratings > 0 ? "filled" : "empty"}.png"
                    alt="별점"
                  />
                  <div class="mx-1">
                    ${movie.ratings}
                  </div>
                </div>
              </div>
              <div class="my-1 modal-overview">
                <div>${movie.overview}</div>
              </div> 
            </div>
            <user-rating class="w-100" movie-id="${movie.id}"></user-rating>
          </div>
        </div>
      </div>
    </div>
    `
  }
  open(newMovie: Movie) {
    this.render(newMovie);
    onClickModalCloseButton();
    this.children[0].classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }
  close() {
    this.children[0].classList.remove('modal--open');
    document.body.style.overflow = 'auto';
  }
}
