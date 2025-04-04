import { toElement } from "../utils/domUtils";

interface TopRatedMovieProps {
  id: number;
  title: string;
  voteAverage: number;
}

export default function TopRatedMovie({
  id,
  title,
  voteAverage,
}: TopRatedMovieProps) {
  return toElement(`
    <div class="top-rated-movie" id="top_${id}">
      <div class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span class="rate-value">${voteAverage}</span>
      </div>
      <div class="title">${title}</div>
      <button class="primary detail" id="top-rated-show-more">자세히 보기</button>
    </div>
  `);
}
