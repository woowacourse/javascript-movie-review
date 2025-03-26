import { fetchMovieDetail } from "../../APIs/movieAPI";

const modalContentTemplate = async (id) => {
  const movie = await fetchMovieDetail(id, (error) => alert(error.message));

  return /* html */ `
    <div class="modal-image">
      <img src="${
        movie.poster_path
          ? import.meta.env.VITE_TMDB_API_BANNER_URL + movie.poster_path
          : "./images/logo.png"
      }" alt="${movie.title}" />
    </div>
    <div class="modal-description">
      <h2>${movie.title}</h2>
      <p class="category">${movie.release_date.slice(
        0,
        4
      )} · ${movie.genres.join(", ")}</p>
      <p class="rate">
        <span class="label">평균</span>
        <img src="./images/star_filled.png" class="star" /><span>${
          movie.vote_average
        }</span>
      </p>
      <hr />
      <p class="subtitle">내 별점</p>
      <hr />
      <p class="subtitle">줄거리</p>
      <p class="detail">${movie.overview}</p>
    </div>
  `;
};

export default modalContentTemplate;
