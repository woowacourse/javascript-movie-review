import Header from "./components/Header";
import MovieContainer from "./components/MovieContainer";
import Footer from "./components/Footer";
import createElement from "./components/utils/createElement";

const $body = document.querySelector("body");
const $wrap = createElement({
  tag: "div",
  id: "wrap",
});

if ($body) {
  $body.appendChild($wrap);
  $wrap.appendChild(Header());
  $wrap.appendChild(MovieContainer());
  $wrap.appendChild(Footer());
}
