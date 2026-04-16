import { Movie } from "../../apis/dtos";
import starEmptyImg from "../../images/star_empty.png";

const MovieBannerComponent = {
  movieBanner({
    title,
    posterPath,
    voteAverage,
  }: Pick<Movie, "title" | "voteAverage" | "posterPath">) {
    return `
      <div class="top-rated-movie" style="background-image: url('${posterPath}')">
        <div class="overlay" aria-hidden="true"></div>
          <div class="container">
            <div class="rate">
              <img src="${starEmptyImg}" class="star" />
              <span class="rate-value">${voteAverage.toFixed(1)}</span>
            </div>
            <div class="title">${title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
      </div>
    `;
  },
};

export default MovieBannerComponent;
