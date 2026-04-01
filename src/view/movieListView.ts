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
        alt="인사이드 아웃 2"
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
