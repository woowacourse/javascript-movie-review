import { popularMovieList } from "../store/movieService";

const MostPopularMovieBanner = () => {
  const header = document.createElement("header");

  const renderMostPopularMovieBanner = () => {
    const movie = popularMovieList.list[0];

    const backgroundImageUrl =
      movie && movie.posterPath
        ? `https://image.tmdb.org/t/p/original${movie.posterPath}`
        : "images/default-background.jpg"; // 기본 이미지

    header.innerHTML = `
  <div class="background-container" style="background-image: url('${backgroundImageUrl}');">
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      
      <div class="top-rated-movie">
        <div class="rate">
          <img src="images/star_empty.png" class="star" />
          <span class="rate-value">${movie?.voteAverage}</span>
        </div>
        <div class="title">${movie?.title}</div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
  </div>
`;
  };

  renderMostPopularMovieBanner();

  return { mostPopularMovieBanner: header, renderMostPopularMovieBanner };
};

export default MostPopularMovieBanner;
