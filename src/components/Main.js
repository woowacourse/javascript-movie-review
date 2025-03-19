import Header from "./Header";
import MovieContainer from "./MovieContainer";
import Footer from "./Footer";
import createElement from "./utils/createElement";

const Main = ({ movies, isReRender }) => {
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
        popularMovie: movies[0],
      })
    );

    $container.appendChild(
      MovieContainer({
        movies,
        isReRender
      })
    );

    $wrap.appendChild($container);
    $wrap.appendChild(Footer());
  }
};

export default Main;