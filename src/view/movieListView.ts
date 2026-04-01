import star_empty from "../../templates/images/star_empty.png";

export interface Movie {
  poster_path: string;
  title: string;
  vote_average: number;
}

export const addMovieList = (
  movieDisplay: HTMLUListElement,
  movieList: Movie[],
) => {
  movieList.forEach((movie: Movie) => {
    const li = document.createElement("li");

    li.innerHTML = /*html*/ ` 
    <div class="item">
      <img
        class="thumbnail"
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img class="star" src="${star_empty}" />
          <span class="vote-average">${movie.vote_average.toFixed(1)}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>`;

    movieDisplay.appendChild(li);
  });
};

export const addMovieSkeletonUIList = (
  movieDisplay: HTMLUListElement,
  count: number = 20,
) => {
  Array.from({ length: count }, () => {
    const li = document.createElement("li");
    li.className = "skeleton-li";

    li.innerHTML = /*html*/ ` 
    <div class="skeleton-item">
      <div class="square"></div>
      <div class="first-line"></div>
        <div class="second-line"></div>
    </div>`;

    movieDisplay.appendChild(li);
  });
};

export const removeMovieSkeletonUIList = (movieDisplay: HTMLUListElement) => {
  movieDisplay.querySelectorAll(".skeleton-li").forEach((it) => it.remove());
};
