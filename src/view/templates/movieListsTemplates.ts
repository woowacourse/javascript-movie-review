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
      <li id="${escapeHTML(item.id)}">
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
  errorList: /*html*/ `
    <li class="thumbnail-empty">
      <img src="./images/empty_icon.png" alt="empty list" class="empty-icon" />
      <p class="empty-message">영화 정보를 불러오지 못했습니다. 다시 시도해주세요.</p>
    </li>
  `,
  emptyList: /*html*/ `
    <li class="thumbnail-empty">
      <img src="./images/empty_icon.png" alt="empty list" class="empty-icon" />
      <p class="empty-message">검색 결과가 없습니다.</p>
    </li>
  `,
}
