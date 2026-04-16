import type { Movie } from "../types/Movie.ts";

const posterBaseURL = "https://image.tmdb.org/t/p/original";

export const createMovieItemHTML = (movie: Movie): HTMLLIElement => {
  const posterSrc = `${posterBaseURL}${movie.poster_path}`;

  const li = document.createElement("li");
  li.dataset.movieId = String(movie.id);
  li.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <div class="item skeleton">
      <div class="skeleton-poster"></div>
      <img class="thumbnail" src="${posterSrc}" alt="영화 포스터 사진" />
      <div class="item-desc">
        <div class="skeleton-rate"></div>
        <div class="skeleton-title"></div>
        <p class="rate">
          <img src="./images/star_empty.png" class="star"/><span>${movie.vote_average}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>`,
  );

  return li;
};

export const createBannerHTML = (movie: Movie): HTMLDivElement => {
  const div = document.createElement("div");
  div.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <div class="rate">
      <img src="./images/star_empty.png" class="star" />
      <span class="rate-value">${movie.vote_average}</span>
    </div>
    <div class="title">${movie.title}</div>
    <button class="primary detail" data-movie-id="${movie.id}">자세히 보기</button>
  `,
  );
  return div
};


export const createNoResultHTML = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
  <div id="no-result">
    <img src="./images/planet_icon.png" alt="검색 결과 없음" class="no-result-icon" />
    <p class="no-result-text">검색 결과가 없습니다.</p>
  </div>`,
  );

  return div;
};

export const createModalHTML = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.insertAdjacentHTML(
    "beforeend",
    /*html*/ `<div class="modal-background" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="" alt="영화 포스터" />
          </div>
          <div class="modal-description">
            <h2></h2>
            <p class="category"></p>
            <p class="rate">
              <span>평균</span> <img src="./images/star_filled.png" class="star" /><span id="average-score"></span>
            </p>
            <hr />
            <h3>내 별점</h3>
            <div id="customRate">
                <div id="rate-stars"></div>                                                      
                <span id="rate-evaluate"></span>                                                 
                <span id="rate-score"></span></div>
            <hr />
            <p class="detail"></p>
          </div>
        </div>
      </div>
    </div>`,
  );
  return div;
};
