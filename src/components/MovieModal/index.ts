import { Movie } from "../../type";

export default class MovieModal extends HTMLElement {

  constructor() {
    super();
  }

  render(movie: Movie) {
    this.innerHTML = `
    <div class="modal modal-dialog-centered">
      <div class="modal-content">
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
            <div>
              <div>
              ${movie.genres}
              </div>
              <div>
              ${movie.ratings}
              </div>
            </div>
            <div>
              <div>${movie.overview}</div>
            </div>
            <div>
              <div>
                내 별점
              </div>
              <div>
                별별별별별
              </div>
              <div>
                점수 보통이에요
              </div>
            </div>
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