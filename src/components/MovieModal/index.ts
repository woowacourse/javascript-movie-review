import { Movie } from "../../type";

export default class MovieModal extends HTMLElement {

  constructor() {
    super();
  }

  render(movie: Movie) {
    this.innerHTML = `
    <div class="modal modal-dialog-centered">
      <div class="modal-content">
      ${JSON.stringify(movie)}
        <div class="d-flex justify-content-between">
          <div></div>
          <div><h2>${movie.title}</h2></div>
          <div>x</div>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w500/${movie.poster}"
              class="modal-img"
            >
          </div>
          <div>
          
          </div>
        </div>
      </div>
    </div>
    `
  }
  open(newMovie: Movie) {
    this.render(newMovie);
    this.children[0].classList.add('modal--open')
  }
  close() {
    this.children[0].classList.remove('modal--open')
  }
}