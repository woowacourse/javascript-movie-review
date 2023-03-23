import { MovieInfoType } from "../@types/movieDataType";
import { $ } from "../utils/selector";

export class MovieItem {
  private _title: string;
  private _posterPath: string;
  private _voteAverage: number;

  constructor(movieInfo: MovieInfoType, id: number) {
    this._title = movieInfo.title;
    this._posterPath = movieInfo.poster_path;
    this._voteAverage = movieInfo.vote_average;
    this.render(id);
    this.handleClick(id);
  }

  create(id: number) {
    return `
    <li id=${id}>
        <div class="item-card">
          <img
            class="item-thumbnail "
            src="https://image.tmdb.org/t/p/w220_and_h330_face${this._posterPath}"
            loading="lazy"
            alt="${this._title}"
          />
          <p class="item-title">${this._title}</p>
          <p class="item-score"><img src="./star_filled.png" alt="별점" /> ${this._voteAverage}</p>
        </div>
</li>
    `;
  }

  render(id: number) {
    $(".item-list")?.insertAdjacentHTML("beforeend", this.create(id));
  }

  handleClick(id: number) {
    const targetMovie = document.getElementById(String(id)) as HTMLElement;
    targetMovie.addEventListener("click", () => this.onClick(id));
  }

  onClick(id: number) {
    const event = new CustomEvent("clickMovieItem");
    document.getElementById(String(id))?.dispatchEvent(event);
  }
}
