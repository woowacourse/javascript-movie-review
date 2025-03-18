import Header from "./UI/Header/Header";
import Movie from "./UI/Movie/MovieItem";
import Thumbnail from "./UI/Thumbnail/Thumbnail";

const body = document.querySelector("body");
console.log(body);

const $header = new Header().render();
// const $thumbnail = new Thumbnail().render();
const $movie = new Movie().render();
console.log($movie);

if (body) {
  body.innerHTML = "";
  body.append($header, $movie);
}
