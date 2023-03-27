import { MovieDetailInfo, Genre } from "../@types/movieDataType";
import { $ } from "../utils/selector";

export class MovieDatail {
  private _title: string;
  private _genres: Genre[];
  private _overView: string;
  private _posterPath: string;
  private _voteAverage: number;

  constructor({
    genres,
    overview,
    poster_path,
    title,
    vote_average,
  }: MovieDetailInfo) {
    this._title = title;
    this._genres = genres;
    this._overView = overview;
    this._posterPath = poster_path;
    this._voteAverage = vote_average;
    this.render();
    this.close();
  }

  create() {
    return `
        <div class="modal-bg">
        <section class="modal">
          <header class="modal__header">
            <h3 class="modal__title">${this._title}</h3>
            <div class="modal__close-btn">❌</div>
          </header>
          <main class="modal__main">
            <article class="modal__poster">
              <img class="modal__poster-img" src="https://image.tmdb.org/t/p/w220_and_h330_face${
                this._posterPath
              }" alt=${this._title} />
            </article>
            <article class="modal__info">
              <div class="modal__info-title-wrapper">
                <h4 class="modal__genre">${this.selectGenre()}</h4>
                <img class="star" src="/star_filled.png" />
                <strong class="modal__score">${this._voteAverage}</strong>
              </div>
              <div class="modal__description">
                ${this._overView}
              </div>
            </article>
          </main>
        </section>
        </div>
        `;
  }

  render() {
    const body = $("body") as HTMLElement;
    body.insertAdjacentHTML("afterbegin", this.create());
    body.classList.add("no-scroll");
  }

  remove() {
    const detailModal = $(".modal") as HTMLElement;
    const modalBg = $(".modal-bg") as HTMLElement;
    const body = $("body") as HTMLElement;
    detailModal.remove();
    modalBg.remove();
    body.classList.remove("no-scroll");
  }

  close() {
    const closeButton = $(".modal__close-btn") as HTMLElement;
    closeButton.addEventListener("click", this.remove);
    document.addEventListener("keyup", this.remove);
  }

  selectGenre() {
    return this._genres.map((item: Genre) => {
      return item.name;
    });
  }
}
