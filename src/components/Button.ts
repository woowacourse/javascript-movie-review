import fetchPopularMovies from "../fetch/fetchPopularMovies";
import fetchSearchMovies from "../fetch/fetchSearchMovies";
import page from "../store/page";
import createElement from "./utils/createElement";
import { ButtonType } from "../types/ButtonType";
import renderMovieList from "./renderMovieList";

interface ButtonProps {
  text: string;
  type: ButtonType;
}

const Button = ({ text, type }: ButtonProps) => {
  const $button = createElement({
    tag: "button",
    classNames: ["primary", type],
  });

  $button.textContent = text;

  $button.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = page.getNextPage();

    renderMovieList(async () => {
      const res = params.has("query")
        ? await fetchSearchMovies(params.get("query") || "", currentPage)
        : await fetchPopularMovies(currentPage);

      return {
        results: res.results,
        totalPages: res.totalPages,
      };
    });
  });

  return $button;
};

export default Button;
