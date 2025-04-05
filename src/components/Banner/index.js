import { openDetailModal } from "../DetailModal/openDetailModal";

export function BannerRender({ vote_average, title, id }) {
  return /* html */ `
    <div id="banner" class="background-container" >
      <div class="overlay" aria-hidden="true" ></div>
      <div class="top-rated-container">
        <div class="top-rated-movie">
          <div class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span class="rate-value">${vote_average}</span>
          </div>
          <div class="title">${title}</div>
          <button class="primary detail" data-movie-id="${id}">자세히 보기</button>
        </div>
      </div>
    </div>
  `;
}

export function BannerMount() {
  const $banner = document.getElementById("banner");
  if ($banner) {
    $banner.addEventListener("click", async (event) => {
      const $detailBtn = event.target.closest(".detail");
      if ($detailBtn) {
        const movieId = $detailBtn.getAttribute("data-movie-id");
        if (movieId) {
          await openDetailModal(movieId);
        }
      }
    });
  }
}
