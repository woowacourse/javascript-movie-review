import Header from "./components/Header";
import MovieContainer from "./components/MovieContainer";
import Footer from "./components/Footer";
import createElement from "./components/utils/createElement";
import fetchPopularMovies from "./fetch/fetchMovies";

const popularMovies = await fetchPopularMovies();

const $body = document.querySelector("body");
const $wrap = createElement({
  tag: "div",
  id: "wrap",
});

if ($body) {
  $body.appendChild($wrap);
  $wrap.appendChild(
    Header({
      popularMovie: popularMovies[0],
    })
  );
  $wrap.appendChild(
    MovieContainer({
      popularMovies,
    })
  );
  $wrap.appendChild(Footer());
}
