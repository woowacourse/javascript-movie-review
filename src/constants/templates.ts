import { LOGO, STAR_FILLED } from '../images';
import { MovieType } from '../types/movie';

export const MOVIE_ITEM_TEMPLATE = (movie: MovieType, imagePath: string) => /* html */ `
  <li>
    <a>
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="${imagePath}"
          loading="lazy"
          alt="${movie.title}"
        />
        <p class="item-title">${movie.title}</p>
        <p class="item-score">
          <img src=${STAR_FILLED} alt="별점" />${movie.vote_average.toFixed(1)}
        </p>
      </div>
    </a>
  </li>  
`;

export const SKELETON_ITEM_TEMPLATE = /* html */ `
<li>
  <a>
    <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>
  </a>
</li>  
`;

export const HEADER_TEMPLATE = /* html */ `
<h1><img src=${LOGO} alt="MovieList 로고" /></h1>
<form class="search-box" id="search-form">
  <input type="search" name="search" id="search" placeholder="검색" />
  <button type="submit" class="search-button">검색</button>
</form>
`;