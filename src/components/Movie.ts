import { MovieType } from "../types";
import { starImage } from "../assets/image";
import MovieClient from "../http/MovieClient";

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
          <div class="my-vote-average">내 별점 보통이에요 </div>
        </div>
     </section>
      <button class="modal-close-button">X</button>
    `;
    $modal.showModal();

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
