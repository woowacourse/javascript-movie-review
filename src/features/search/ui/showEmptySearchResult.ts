import { toElement } from "../../../shared/utils/toElement";

export function showEmptySearchResult() {
  const $movieContainer = document.getElementById("movie-container");

  const $emptySearchResultContainer = document.querySelector(
    ".empty-search-result-container"
  );

  if ($emptySearchResultContainer) {
    return;
  }

  $movieContainer?.appendChild(
    toElement(`
  <div class="empty-search-result-container">
    <img src="./images/error_default_image.png" alt="검색 결과가 없습니다." class="empty-search-result-image"/>
    <p class="empty-search-result-text">검색 결과가 없습니다.</p>
  </div>
  `)
  );
}
