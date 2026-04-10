import { fetchMovieDetail } from "./movieAPIResponse";
import type { MovieDetail } from "../types/MovieDetail";
import StarRating from "./StarRating.ts";
import { LocalRatingStorage } from "./storage/LocalRatingStorage";

const posterBaseURL = "https://image.tmdb.org/t/p/original/";
const base = import.meta.env.BASE_URL;

const createMovieDetailItem = (
  movieDetailData: MovieDetail,
): HTMLDivElement => {
  const posterSrc = `${posterBaseURL}${movieDetailData.poster_path}`;

  // 출시년도 파싱
  const releaseDate = movieDetailData.release_date.split("-")[0];

  // 장르 파싱
  const parseGenre = (movieDetailData: MovieDetail) => {
    return movieDetailData.genres.map((genre) => genre.name).join(", ");
  };

  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-container");

  modalDiv.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
            <div class="modal-image">
              <img src="" alt="영화 포스터 사진" />
            </div>
            <div class="modal-description">
              <h2>${movieDetailData.title}</h2>
              <p class="category">
                ${releaseDate} · ${parseGenre(movieDetailData)}
              </p>
              <div class="rate">
                <span class="rate-label">평균</span>
                <img src="./images/star_filled.png" class="star" />
                <span class="rate-avg-value">${movieDetailData.vote_average}</span>
              </div>
              <hr />
              <h3 class="my-rate-title">내 별점</h3>
              <div class="my-rate">
                <div class="my-rate-stars">
                  <img src="./images/star_empty.png" class="star my-star" />
                  <img src="./images/star_empty.png" class="star my-star" />
                  <img src="./images/star_empty.png" class="star my-star" />
                  <img src="./images/star_empty.png" class="star my-star" />
                  <img src="./images/star_empty.png" class="star my-star" />
                </div>
                <div class="my-score">
                  <span class="my-score-label"></span>
                  <span class="my-rate-value"></span>
                </div>
              </div>
              <hr />
              <h3 class="detail-title">줄거리</h3>
              <p class="detail">
              ${movieDetailData.overview}
            </p>
        </div>
    `,
  );

  const img = modalDiv.querySelector<HTMLImageElement>(".modal-image img")!;
  img.addEventListener(
    "error",
    () => {
      img.src = `${base}images/no_image.png`;
    },
    { once: true },
  );

  img.src = posterSrc;

  return modalDiv;
};

export const renderMovieDetail = async (movieId: number) => {
  try {
    const movieDetailData: MovieDetail = await fetchMovieDetail(movieId);

    const modal = document.querySelector(".modal");
    modal?.appendChild(createMovieDetailItem(movieDetailData));

    const rateContainer = modal?.querySelector(".my-rate") as HTMLElement;
    if (rateContainer) {
      new StarRating(rateContainer, movieId, new LocalRatingStorage());
    }
  } catch (error) {
    alert(
      "영화 세부정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
    );
    return 0;
  }
};
