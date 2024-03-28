import { MovieType } from "../types";
import { starImage, starEmpty } from "../assets/image";
import MovieClient from "../http/MovieClient";
import { getMyVoteAverage, setMyVoteAverage } from "../utils/localStorage";
import { STAR_SCORE_DESCRIPTION } from "../constants/movies";

const drawStarScore = (movieId: number) => {
  const myVoteAverage = getMyVoteAverage(movieId);
  const $starScore = document.querySelector<HTMLSpanElement>(".star-score");
  const $starScoreDescription = document.querySelector<HTMLSpanElement>(".star-score-description");

  if (!$starScore || !$starScoreDescription) return;
  $starScore.innerHTML = /*html*/ `
    ${`<img src="${starImage}" alt="별점" class="star" />`.repeat(myVoteAverage / 2)}
    ${`<img src="${starEmpty}" alt="별점" class="star" />`.repeat(5 - myVoteAverage / 2)}
  `;
  $starScoreDescription.innerText = `${STAR_SCORE_DESCRIPTION[myVoteAverage]}`;

  const $stars = document.querySelectorAll<HTMLImageElement>(".star");
  $stars.forEach(($star) => {
    $star.addEventListener("click", (e) => {
      e.preventDefault();
      const starIndex = Array.from($stars).indexOf($star);
      setMyVoteAverage(movieId, (starIndex + 1) * 2);
      drawStarScore(movieId);
    });
  });
};

export const createMovieElement = ({ id, title, thumbnail, voteAverage }: MovieType) => {
  const listItem = document.createElement("li");
  listItem.id = String(id);
  listItem.classList.add("movie");
  listItem.innerHTML = /*html*/ `
    <a href="#">
      <div class="item-card">
        <img
        class="item-thumbnail"
        src="${thumbnail}"
        loading="lazy"
        alt="${title}"
        />
        <p class="item-title">${title}</p>
        <p class="item-score">
        <img src="${starImage}" alt="별점" /> ${voteAverage.toFixed(1)}
        </p>
      </div>
    </a> 
  `;

  listItem.addEventListener("click", async (e) => {
    e.preventDefault();
    const $modal = document.querySelector<HTMLDialogElement>(".modal");
    if (!$modal) return;
    const data = await MovieClient.getMovieDetail(Number(listItem.id));
    $modal.innerHTML = /*html*/ `
     <div class="modal-background"></div>
     <h3 class="movie-title">${data.title}</h3>
     <section>
        <img
        class="item-thumbnail"
        src="${data.thumbnail}"
        loading="lazy"
        alt="${data.title}"
        />
        <div class="movie-info">
          <div class="movie-genres">${data.genres.join(", ")} <img src="${starImage}" alt="별점" /> ${data.voteAverage}</div>
          <div class="movie-overview"> ${data.overview}</div>
          <div class="my-vote-average">
            <span>내 별점 </span> 
            <span class="star-score"></span> 
            <span class="star-score-description">내 별점 보통이에요</span> 
          </div>
        </div>
     </section>
      <button class="modal-close-button">X</button>
    `;
    $modal.showModal();
    drawStarScore(id);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        $modal.close();
      }
    });
    const $modalCloseButton = document.querySelector<HTMLButtonElement>(".modal-close-button");
    $modalCloseButton?.addEventListener("click", (e) => {
      e.preventDefault();
      $modal.close();
    });
    $modal.addEventListener("click", (e: MouseEvent) => {
      if (e.target === $modal) {
        $modal.close();
      }
    });
  });

  return listItem;
};
