import Star from '../../assets/star_filled.png';

import { Movie } from './../../types/movie';
import '../MovieItem/MovieItem.css';
import { POSTER_BASE_URL } from '../../consts/URL';

const MovieItem = {
  skeletonTemplate() {
    const skeletonItemBox = document.createElement('li');
    skeletonItemBox.innerHTML = /* html */ `
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div> 
          <div class="item-score skeleton"></div>
        </div>
      </a>`;
    return skeletonItemBox;
  },

  template(movie: Movie) {
    const { id, title, posterPath, voteAverage } = movie;
    const itemBox = document.createElement('li');
    itemBox.setAttribute('data-movie-id', String(id));

    itemBox.innerHTML = /* html */ `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src=${POSTER_BASE_URL + posterPath}
            loading="lazy"
            alt=${title}
          />
          
          <p class="item-title">${title}</p>
          <p class="item-score"><img src=${Star} alt="별점" /><span>${voteAverage}</span></p>
        </div>
      </a>
    `;

    return itemBox;
  },
};

export default MovieItem;
