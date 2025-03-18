import { MovieResult } from "../../types/movieApiType";

export default function MovieList(moviesResult: MovieResult[]) {
  const ul = document.createElement("ul");
  ul.className = "thumbnail-list";
  moviesResult.forEach((movieResult) => {
    const li = document.createElement("li");

    li.innerHTML = /*html*/ `
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${movieResult.backdrop_path}"
            alt="${movieResult.title}"
          />
          <div class="item-desc">
            <p class="rate">
              <img src="./images/star_empty.png" class="star" /><span
                >${movieResult.vote_average}</span
              >
            </p>
            <strong>${movieResult.title}</strong>
          </div>
        </div>
    `;

    ul.appendChild(li);
  });
  return ul;
}
