import { createElement } from "../../util/dom";
import Modal from "../modal/modal";
import DetailModal from "../detailModal/detailModal";
import { fetchUrl } from "../../util/fetch";
import {
  defaultOptions,
  URLS,
  defaultQueryObject,
} from "../../setting/settings";
import Spinner from "../spinner/spinner";
import replaceModalContent from "../../service/replaceModalContent";

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
  Modal(Spinner());

  const data = await fetchUrl(
    `${URLS.detailMovieUrl}${id}`,
    defaultQueryObject,
    defaultOptions
  );

  const $detailModal = DetailModal({ ...data });

  replaceModalContent($detailModal);
}
