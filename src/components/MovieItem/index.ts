import { Movie } from "../../type";
import MovieModal from "../MovieModal";

export default class MovieItem extends HTMLElement {
  private movie: Movie = {
    id: "",
    genres: [],
    overview: "",
    poster: "",
    title: "",
    ratings: 0
  };

  connectedCallback() {
    this.addEventListener('movieItemEvent', (event: CustomEventInit) => {
      this.movie = event.detail;
      this.render();
    });
    this.addEventListener('mouseover', () => {
      this.style.cursor = 'pointer';
    });
    this.addEventListener('click', () => {
      const el = document.getElementById('movie-modal') as MovieModal;
      el.open(this.movie);
    });
  }

  render() {
    this.innerHTML = `
    <li>
        <div class="item-card">
          <img
            class="item-thumbnail skeleton"
            src="https://image.tmdb.org/t/p/w500/${this.movie.poster}"
            onerror="
              this.style.border='1px solid #e2e2e2';
              this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            "
            loading="lazy"
            alt="${this.movie.title}"
          />
          <p class="item-title">${this.movie.title}</p>
          <p class="item-score">
            <img src="./assets/star_${this.movie.ratings > 0 ? "filled" : "empty"
      }.png" alt="별점" /> ${this.movie.ratings.toFixed(1)}
          </p>
        </div>
    </li>
    `;
  }
}
