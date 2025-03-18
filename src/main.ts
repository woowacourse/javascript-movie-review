import Header from "./UI/Header/Header";
import Thumbnail from "./UI/Thumbnail/Thumbnail";

const body = document.querySelector("body");
console.log(body);

const $header = new Header().render();
const $thumbnail = new Thumbnail().render();

if (body) {
  body.innerHTML = "";
  body.append($header, $thumbnail);
}
