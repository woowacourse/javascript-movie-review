import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import DetailModal from "./DetailModal";
import MovieImg from "./MovieImg";
import MovieScore from "./MovieScore";
import MovieTitle from "./MovieTitle";

const Card = (movie: Movie) => {
  const $card = createElementWithAttribute("div", { class: "item-card" });
  const $img = MovieImg(movie.poster_path, movie.title, "item-thumbnail");
  const $title = MovieTitle(movie.title, "item-title");
  const $score = MovieScore(movie.vote_average, "item-score");

  $card.appendChild($img);
  $card.appendChild($title);
  $card.appendChild($score);

  return $card;
};

const ItemCard = (movie: Movie) => {
  const $li = document.createElement("li");
  const $a = document.createElement("a");
  const $card = Card(movie);

  $a.appendChild($card);
  $li.appendChild($a);

  $li.addEventListener("click", () => {
    DetailModal(movie);
  });

  return $li;
};

export default ItemCard;
