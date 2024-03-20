import MovieItem from "../MovieItem/MovieItem";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import { getMovieData } from "../../api/getMovieData";
import { getPopularMoviesData } from "../../api/getPopularMoviesData";
import { $, createElement } from "../../utility/dom";

class MovieList {
  #pageCount = 1;

  async createMovieItems() {
    const data = await getPopularMoviesData(this.#pageCount.toString());
    const ul = $(".item-list");

    data.forEach(({ title, poster_path, vote_average }: IMovieItemData) => {
      const movieItem = new MovieItem({ title, poster_path, vote_average });
      ul?.appendChild(movieItem.createMovieItem());
    });
  }

  createMovieList() {
    const movieListSection = createElement("section", {
      class: "item-view",
    });

    const movieListTitle = createElement("h2");
    movieListTitle.textContent = "지금 인기 있는 영화";

    const movieListUl = createElement("ul", {
      class: "item-list",
    });

    movieListSection.appendChild(movieListTitle);
    movieListSection.appendChild(movieListUl);

    const moreMoviesButton = MoreMoviesButton.createMoreMoviesButton();

    movieListSection.appendChild(moreMoviesButton);

    return movieListSection;
  }
}

export default MovieList;
