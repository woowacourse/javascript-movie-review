import { Movie } from '@/types/movie';
import Star from '../../assets/star_filled.png';

class MovieItem {
  movie;

  constructor(movie: Movie) {
    this.movie = movie;
  }

  template() {
    const POSTER_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face/';

    const { title, posterPath, voteAverage } = this.movie;
    const itemBox = document.createElement('li');
    itemBox.innerHTML = /* html */ `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src=${POSTER_URL + posterPath}
            loading="lazy"
            alt=${title}
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src=${Star} alt="별점" />${voteAverage}</p>
        </div>
      </a>
    `;

    return itemBox;
  }
}

export default MovieItem;
