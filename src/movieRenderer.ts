import { fetchMovies, fetchSearchedMovies } from "./movieAPIResponse.ts";

export const renderMovies = async (moviePageCount) => {
  const movies = await fetchMovies(moviePageCount);

  const list = document.querySelector(".thumbnail-list");
  const posterBaseURL = "https://image.tmdb.org/t/p/original/";

  movies.forEach((movie: Movie) => {
    const li = `<li>
              <div class="item">
                <img class="thumbnail"
                  src="${posterBaseURL}${movie.poster_path}"
                  alt="영화 포스터 사진" />
                <div class="item-desc">
                  <p class="rate">
                    <img src="/images/star_empty.png" class="star" /><span>${movie.vote_average}</span>
                  </p>
                  <strong>${movie.title}</strong>
                </div>
              </div>
            </li>`;
    list.insertAdjacentHTML("beforeend", li);
  });
};

export const renderBanner = async () => {
  const movies = await fetchMovies(1);

  const banner = document.querySelector(".top-rated-movie");
  const backgroundContainer = document.querySelector(".background-container");
  const bannerBaseURL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

  const mostPopularMovie = movies[0];

  backgroundContainer.style.backgroundImage = `url("${bannerBaseURL + mostPopularMovie.backdrop_path}")`;

  const mostPopularMovieBanner = `
            <div class="rate">
              <img src="/images/star_empty.png" class="star" />
              <span class="rate-value">${mostPopularMovie.vote_average}</span>
            </div>
            <div class="title">${mostPopularMovie.title}</div>
            <button class="primary detail">자세히 보기</button>
            `;

  banner.insertAdjacentHTML("beforeend", mostPopularMovieBanner);
};

export const renderSearchedMovies = async (
  searchKeyword: string,
  searchPageCount: number,
) => {
  const movies = await fetchSearchedMovies(searchKeyword, searchPageCount);

  const list = document.querySelector(".thumbnail-list");
  const posterBaseURL = "https://image.tmdb.org/t/p/original/";
  list.innerHTML = `<div></div>`;
  movies.forEach((movie: Movie) => {
    const li = `<li>
              <div class="item">
                <img class="thumbnail"
                  src="${posterBaseURL}${movie.poster_path}"
                  alt="영화 포스터 사진" />
                <div class="item-desc">
                  <p class="rate">
                    <img src="/images/star_empty.png" class="star" /><span>${movie.vote_average}</span>
                  </p>
                  <strong>${movie.title}</strong>
                </div>
              </div>
            </li>`;
    list.insertAdjacentHTML("beforeend", li);
  });
};
