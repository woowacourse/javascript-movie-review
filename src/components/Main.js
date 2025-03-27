import Modal from "./movie/movieModal/Modal";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MovieContainer from "./movie/MovieContainer";
import createElement from "./utils/createElement";

const Main = ({ movies }) => {
  const $body = document.querySelector("body");

  if ($body) {
    const $wrap = createElement({
      tag: "div",
      id: "wrap",
    });

    const $container = createElement({
      tag: "div",
      id: "container",
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
      })
    );

    const $dialog = createElement({
      tag: "dialog",
      classNames: ["modal-background", "active"],
      id: "modalBackground",
    });

    $wrap.append($container, Footer(), $dialog);
  }
};

export default Main;
