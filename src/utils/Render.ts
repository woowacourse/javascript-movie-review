import { Movie } from "../../types/domain.ts";
import MovieItem from "../components/MovieItem.ts";
import MovieList from "../components/MovieList.ts";
import { selectElement } from "./ui.ts";

export const toggleElementVisibility = (
  selector: string,
  option: "show" | "hidden"
) => {
  const element = selectElement<HTMLElement>(selector);
  if (option === "show") element.classList.remove("hidden");
  if (option === "hidden") element.classList.add("hidden");
};

export const createObserverCallback = (
  fetch: (
    movieList: MovieList,
    observer: IntersectionObserver
  ) => Promise<void>,
  movieList: MovieList
): IntersectionObserverCallback => {
  return (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetch(movieList, observer);
        observer.unobserve(entry.target);
      }
    });
  };
};

export const setNewObservingTarget = (
  observer: IntersectionObserver,
  selector: string
) => {
  const newTarget = selectElement(selector);
  if (newTarget) {
    observer.observe(newTarget);
  }
};

const updateMovieList = async (
  movieList: MovieList,
  observer: IntersectionObserver,
  fetch: (currentItemCount?: number) => Promise<Movie[]>
) => {
  const totalItems = movieList.getTotalItems();
  const newMovieData = await fetch(totalItems);

  const movieItems = newMovieData.map(
    ({ id, title, posterPath, voteAverage }) => {
      const movieItem = new MovieItem({
        id,
        title,
        voteAverage,
        posterPath,
      });
      return movieItem.create();
    }
  );

  movieList.updateList(movieItems);

  const newTarget = selectElement("ul.thumbnail-list > li:last-child");
  if (newTarget) {
    observer.observe(newTarget);
  }
};
