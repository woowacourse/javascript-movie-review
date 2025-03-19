import Header from "./Header";
import MovieContainer from "./MovieContainer";
import Footer from "./Footer";
import createElement from "./utils/createElement";

const Main = ({ popularMovies, isReRender }) => {
  const $body = document.querySelector("body");

  if ($body) {
    const $wrap = createElement({
        tag: "div",
        id: "wrap",
    });

    const $container = createElement({
        tag: "div",
        id: "container"
    });

    $body.appendChild($wrap);


    $container.appendChild(
      Header({
        popularMovie: popularMovies[0],
      })
    );

    $container.appendChild(
      MovieContainer({
        popularMovies: popularMovies,
      })
    );

    $wrap.appendChild($container);
    $wrap.appendChild(Footer());
  }
};

export default Main;