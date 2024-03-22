import { Movie } from "../type/movie";

import MovieCard from "./MovieCard";

const MovieItem = (movie: Movie) => {
  const $li = document.createElement("li");
  const $a = document.createElement("a");
  const $card = MovieCard(movie);
  //2단계 상세 모달 기능 추가
  $a.appendChild($card);
  $li.appendChild($a);

  return $li;
};

export default MovieItem;
