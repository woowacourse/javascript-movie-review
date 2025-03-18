import Header from "./components/Header";
import MovieList from "./components/MovieList";

const $body = document.querySelector("body");

if ($body) {
  $body.appendChild(Header());
  $body.appendChild(MovieList());
}
