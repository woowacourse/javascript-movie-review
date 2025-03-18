import Header from "./components/Header";
import MovieContainer from "./components/MovieContainer";

const $body = document.querySelector("body");

if ($body) {
  $body.appendChild(Header());
  $body.appendChild(MovieContainer());
}
