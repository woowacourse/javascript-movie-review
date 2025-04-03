import { $, createElement } from "../utils/dom";
import { Genre, MovieDetail, MovieRating } from "../../types/movie.ts";
import { fetchMovieDetail } from "../store/movieService.ts";
import { mappedImage } from "../utils/mappedImage.ts";
import { createStorage } from "../utils/localStorageUtils.ts";

type ModalProps = {
  item: {
    id: number;
    title: string;
    rating: number;
    imageSrc: string | null;
    description: string;
    releaseDate: string;
  };
};

const RATING_MESSAGES: Record<number, string> = {
  0: "별점을 남겨 주세요",
  2: "별로였어요",
  4: "아쉬운 작품이에요",
  6: "그럭저럭 볼만했어요",
  8: "재밌게 봤어요",
  10: "명작이에요",
};

const movieRatingsStorage = createStorage<MovieRating[]>("movieRatings");

const Modal = ({ item }: ModalProps) => {
  const { id } = item;
  const modalState = {
    movieDetail: null as MovieDetail | null,
    userRating: 0,
  };

  const $body = $("body");

  const $modalBackground = createElement("div", {
    class: ["modal-background", "active"],
    id: "modalBackground",
  });

  const $modal = createElement("dialog", {
    class: ["modal"],
  });

  $body?.appendChild($modalBackground);
  $body?.appendChild($modal);

  const closeModal = () => {
    $modal.close();
    $modal.remove();
    $modalBackground.remove();
  };

  const handleClickClose = () => {
    closeModal();
  };

  const handleKeyDownESC = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const handleClickBackDrop = (event: MouseEvent) => {
    if (event.target === $modal) {
      closeModal();
    }
  };

  const getUserRating = (movieId: number): number => {
    const ratings = movieRatingsStorage.get();
    if (!ratings || !Array.isArray(ratings)) {
      return 0;
    }

    const userRating = ratings.find((rating: MovieRating) => rating.movieId === movieId);
    return userRating ? userRating.rating : 0;
  };

  const saveUserRating = (movieId: number, rating: number) => {
    const ratings = movieRatingsStorage.get() || [];

    const existingRatingIndex = ratings.findIndex((rating: MovieRating) => rating.movieId === movieId);

    if (existingRatingIndex !== -1) {
      ratings[existingRatingIndex].rating = rating;
    } else {
      ratings.push({ movieId, rating });
    }

    movieRatingsStorage.set(ratings);
    return rating;
  };

  const handleStarClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("star-item")) return;

    const rating = parseInt(target.dataset.value || "0", 10);
    modalState.userRating = saveUserRating(id, rating);

    renderStars(modalState.userRating);
    updateRatingMessage(modalState.userRating);
  };

  const renderStars = (rating: number) => {
    const starContainer = $modal.querySelector(".star-container");
    if (!starContainer) return;

    starContainer.innerHTML = "";

    for (const i of [2, 4, 6, 8, 10]) {
      const starClass = i <= rating ? "star_filled.png" : "star_empty.png";

      const star = createElement("img");
      star.src = `images/${starClass}`;
      star.classList.add("star");
      star.classList.add("star-item");
      star.dataset.value = i.toString();

      starContainer.appendChild(star);
    }
  };

  const updateRatingMessage = (rating: number) => {
    const ratingMessage = $modal.querySelector(".rating-message");
    if (!ratingMessage) return;

    const message = RATING_MESSAGES[rating] || RATING_MESSAGES[0];
    ratingMessage.textContent =
      rating > 0 ? `${message}(${rating}/10)` : message;
  };

  const extractYear = (date: string) => {
    return date.slice(0, 4);
  };

  const formatGenres = (genres: Genre[]): string => {
    return genres.map((genre) => genre.name).join(", ");
  };

  $modalBackground.addEventListener("click", handleClickBackDrop);
  document.addEventListener("keydown", handleKeyDownESC);

  $modal.innerHTML = `
        <button class="close-modal" id="closeModal">
          <img src="images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="${item.imageSrc ? mappedImage(item.imageSrc) : ""}" alt="${
    item.title
  }"
            />
          </div>
          <div class="modal-description">
          <div class="modal-header">
          ${item.title ? `<h2>${item.title}</h2>` : "영화 제목 없음"}
          
            <p class="category">
              <span>${extractYear(item.releaseDate)}</span> · 로딩중...
            </p>
            <div class="rate-container">
              <span class="average">평균</span>
              <img src="images/star_filled.png" class="star" /><span>${
                item.rating
              }</span>
            </div>
          </div>
          <hr />
            
            <div class="my-rate-container">
            <h3>내 별점</h3>
            <div class="my-rate-content">
            <div class="star-container">
              <!-- 별점 동적으로 추가 -->
            </div>
            <span class="rating-message">${RATING_MESSAGES[0]}</span>
            </div>
            </div>
            <hr />
            
            <h3>줄거리</h3>
            ${
              item.description
                ? `<p class="detail">${item.description}</p>`
                : `<p class="detail">줄거리 요약이 없습니다.</p>`
            }
          </div>
        </div>
`;

  const closeButton = $modal.querySelector(".close-modal");

  closeButton?.addEventListener("click", handleClickClose);
  $modal.addEventListener("click", handleClickBackDrop);

  const starContainer = $modal.querySelector(".star-container");
  starContainer?.addEventListener("click", handleStarClick);

  modalState.userRating = getUserRating(id);
  renderStars(modalState.userRating);
  updateRatingMessage(modalState.userRating);

  const loadMovieDetail = async () => {
    try {
      const movieDetail = await fetchMovieDetail(item.id);
      const genresText =
        movieDetail.genres && movieDetail.genres.length > 0
          ? formatGenres(movieDetail.genres)
          : "장르 정보 없음";

      const $category = $modal.querySelector(".category");

      if ($category) {
        $category.innerHTML = `<span>${extractYear(
          item.releaseDate
        )}</span> · ${genresText}`;
      }
    } catch (error) {
      console.error("영화 상세 정보를 불러오는데 실패했습니다.", error);
    }
  };

  loadMovieDetail();

  return $modal;
};

export default Modal;
