import { THUMBNAIL_IMAGE } from "../../constants/api";
import { escapeHTML } from "../../utils/escape";

export const movieListTemplate = {
  skeletonList: /*html*/ `
    <li class="skeleton-card" aria-hidden="true">
      <div class="item">
        <div class="thumbnail skeleton-box"></div>
        <div class="item-desc">
          <p class="rate">
            <span class="skeleton-star skeleton-box"></span>
            <span class="skeleton-score skeleton-box"></span>
          </p>
          <strong class="skeleton-title skeleton-box"></strong>
        </div>
      </div>
    </li>
  `,
  movieList: (item: Movies) => 
    /*html*/ `
      <li class="movie" id="${escapeHTML(item.id)}" data-movie-id="${item.id}">
        <div class="item">
          <img
            class="thumbnail"
            src="${escapeHTML(THUMBNAIL_IMAGE + item.poster_path)}"
            alt="${escapeHTML(item.title)}"
          />
          <div class="item-desc">
            <p class="rate">
              <img
                src="./images/star_empty.png"
                class="star"
              />
              <span class="item-rate">"${escapeHTML(item.vote_average)}"</span>
            </p>
            <strong class="item-title">"${escapeHTML(item.title)}"</strong>
          </div>
        </div>
      </li>
    `
  ,
}
