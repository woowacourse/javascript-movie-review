import { LOGO, MODAL_CLOSE_BTN, NO_IMAGE, STAR_EMPTY, STAR_FILLED } from '../images';
import { MovieDetailType, MovieType } from '../types/movie';
import { MOVIE_PATH } from './movie';
import { RATING_MESSAGE } from './rating';

export const MOVIE_ITEM_TEMPLATE = (movie: MovieType, imagePath: string) => /* html */ `
  <li class="movie-item">
    <a data-id=${movie.id}>
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

export const DETAIL_MODAL_TEMPLATE = (movie: MovieDetailType, ratingValue: number) => /* html */ `
  <div id="detail-modal--header">
    <div id="detail-modal--title">${movie.title}</div>  
    <div id="detail-modal--close-btn"><img src="${MODAL_CLOSE_BTN}" alt="별점"/></div>
  </div>
  <div id="detail-modal--body">
    <img id="detail-modal--body-img" src="${
      movie.poster_path ? `${MOVIE_PATH}/${movie.poster_path}` : NO_IMAGE
    }"/>
    <div id="detail-modal--contents">
      <div id="detail-modal--info">
        <div id="detail-modal--info-header">
          <div id="detail-modal--genre">${
            movie.genres.length !== 0
              ? movie.genres.map((genre) => genre.name).join(', ')
              : '장르가 없습니다.'
          }</div>
          <div id="detail-modal--vote"><img src="${STAR_FILLED}"/>${movie.vote_average.toFixed(
  1,
)}</div>
        </div>
        <div id="detail-modal--overview">${
          movie.overview ? movie.overview : '등록된 줄거리가 없습니다.'
        }</div>
      </div>
      <div id="detail-modal--rating">
        <div id="detail-modal--label">내 별점</div>
        <div id="detail-modal--rating-stars">
          <img src="${
            ratingValue >= 2 ? STAR_FILLED : STAR_EMPTY
          }" class="rating-star" data-id=2 alt="별점"/>
          <img src="${
            ratingValue >= 4 ? STAR_FILLED : STAR_EMPTY
          }" class="rating-star" data-id=4 alt="별점"/>
          <img src="${
            ratingValue >= 6 ? STAR_FILLED : STAR_EMPTY
          }" class="rating-star" data-id=6 alt="별점"/>
          <img src="${
            ratingValue >= 8 ? STAR_FILLED : STAR_EMPTY
          }" class="rating-star" data-id=8 alt="별점"/>
          <img src="${
            ratingValue >= 10 ? STAR_FILLED : STAR_EMPTY
          }" class="rating-star" data-id=10 alt="별점"/>
        </div>
        <div id="detail-modal--rating-value">${ratingValue}</div>
        <div id="detail-modal--rating-label">${RATING_MESSAGE[ratingValue]}</div>
      </div>
    </div>
  </div>
`;
