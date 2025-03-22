import { createElement } from "../utils";

interface TopRatedMovieProps {
  title: string;
  voteAverage: number;
}

export default function TopRatedMovie({
  title,
  voteAverage,
}: TopRatedMovieProps) {
  const $topRatedMovie = createElement(`
  <div class="top-rated-movie">
    <div class="rate">
      <img src="./images/star_empty.png" class="star" />
      <span class="rate-value">${voteAverage}</span>
    </div>
    <div class="title">${title}</div>
    <button class="primary detail">자세히 보기</button>
    </div>
  `);

  return $topRatedMovie;
}
