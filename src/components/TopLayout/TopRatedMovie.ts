import { Button } from "../index";

interface TopRatedMovieProps {
  title: string;
  voteAverage: number;
}

export default function TopRatedMovie({
  title,
  voteAverage,
}: TopRatedMovieProps) {
  const $topRatedMovie = document.createElement("div");
  $topRatedMovie.className = "top-rated-movie";

  $topRatedMovie.innerHTML = /*html*/ `
    <div class="rate">
      <img src="./images/star_empty.png" class="star" alt="star_empty" />
      <span class="rate-value">${voteAverage}</span>
    </div>
    <div class="title">${title}</div>
  `;

  $topRatedMovie.append(
    Button({ className: "detail", textContent: "자세히 보기" })
  );

  return $topRatedMovie;
}
