import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import MovieImg from "./MovieImg";
import MovieScore from "./MovieScore";
import MovieTitle from "./MovieTitle";

const Card = (movie: Movie) => {
  const $card = createElementWithAttribute("div", { class: "item-card" });
  const $img = MovieImg(movie);
  const $title = MovieTitle(movie);
  const $score = MovieScore(movie);

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

  return $li;
};

export default ItemCard;
