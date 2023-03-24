import movies from '../domain/Movies';
import { DetailModalType } from '../type/movie';

export default class DetailModal extends HTMLElement {
  constructor() {
    super();

    movies.subscribe('detail', this.render.bind(this));

    this.render();
  }

  render(
    { title, poster_path, genres, vote_average, overview }: any = {
      title: '',
      poster_path: '',
      genres: [],
      vote_average: 0,
      overview: '',
    }
  ) {
    this.innerHTML = `
    <dialog class="movie-modal">
      <div>
        <div>
          <h2>${title}</h2>
          <img src="" alt="닫기" />
        </div>
        <div>
          <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="포스터" />
          <div>
            <span>${genres}</span>
            <img src="" alt="별점" />
            <span>${vote_average}</span>
            <p>${overview}</p>
            <div>
              <span>내 별점</span>
              <img src="" alt="나의 별점" />
              <span>6</span>
              <span>보통이에요</span>
            </div>
          </div>
        </div>
      </div>
    </dialog>`;
  }
}
