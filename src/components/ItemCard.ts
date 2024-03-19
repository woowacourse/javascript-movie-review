import starFilled from "../../templates/star_filled.png";
import { Movie } from "../type/movie";
import createElementWithAttribute from "../utils/createElementWithAttribute";

const tmdbImageUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w500";

const MovieImg = (movie: Movie) =>
  createElementWithAttribute("img", {
    class: "item-thumbnail",
    src: tmdbImageUrl + posterSize + movie.poster_path,
    loading: "lazy",
    alt: movie.title,
  });

const MovieTitle = (movie: Movie) => {
  const $title = createElementWithAttribute("p", { class: "item-title" });
  $title.textContent = movie.title;

  return $title;
};

const Score = (movie: Movie) => {
  const $score = createElementWithAttribute("p", { class: "item-score" });
  const $star = createElementWithAttribute("img", {
    src: starFilled,
    alt: "별점",
  });
  $score.appendChild($star);
  $score.appendChild(document.createTextNode(movie.vote_average.toString()));

  return $score;
};

const Card = (movie: Movie) => {
  const $card = createElementWithAttribute("div", { class: "item-card" });
  const $img = MovieImg(movie);
  const $title = MovieTitle(movie);
  const $score = Score(movie);
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
