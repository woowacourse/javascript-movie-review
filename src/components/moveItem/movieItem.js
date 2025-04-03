import { createElement } from "../../util/dom";
import Modal from "../modal/modal";
import MovieDetail from "../movieDetail/movieDetail";
import { URLS } from "../../setting/settings";
import Spinner from "../spinner/spinner";
import { createSingleFetchQuery } from "../../service/createSingleQuery";
import fetchWithErrorHandling from "../../util/fetchWithErrorHandling";

export default function MovieItem({ src, title, rate, id }) {
  const $li = createElement("li");
  let url = `https://image.tmdb.org/t/p/w500/${src}`;
  if (!src) url = "images/fallback.png";

  $li.innerHTML = `
        <div class="item">
            <img
            class="thumbnail"
            src='${url}'
            alt=${title}
            />
            <div class="item-desc">
            <p class="rate">
                <img src="./images/star_empty.png" class="star" />
                <span>${rate}</span>
            </p>
            <strong>${title}</strong>
            </div>
        </div>
    `;

  $li.addEventListener("click", () => handleMovieClick({ id }));

  return $li;
}

async function handleMovieClick({ id }) {
  const $modal = new Modal(Spinner());

  const fetchMovieDetail = createSingleFetchQuery(
    `${URLS.detailMovieUrl}${id}`
  );
  const data = await fetchWithErrorHandling(fetchMovieDetail);

  $modal.replaceModalContent(MovieDetail({ ...data }));
}
