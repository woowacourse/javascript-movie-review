import { MovieItemProps } from "../../../types/domain";
import MovieItem from "../MovieItem";
import { movieListContainer } from "./Element";

const MovieList = {
  init() {
    this.set([
      {
        id: 696506,
        posterPath:
          "https://media.themoviedb.org/t/p/w440_and_h660_face/7KghOYtsxFquUuw4THbARsSEo6g.jpg",
        rate: 7.0,
        title: "미키 17",
      },
      {
        id: 696506,
        posterPath:
          "https://media.themoviedb.org/t/p/w440_and_h660_face/7KghOYtsxFquUuw4THbARsSEo6g.jpg",
        rate: 7.0,
        title: "미키 17",
      },
      {
        id: 696506,
        posterPath:
          "https://media.themoviedb.org/t/p/w440_and_h660_face/7KghOYtsxFquUuw4THbARsSEo6g.jpg",
        rate: 7.0,
        title: "미키 17",
      },
      {
        id: 696506,
        posterPath:
          "https://media.themoviedb.org/t/p/w440_and_h660_face/7KghOYtsxFquUuw4THbARsSEo6g.jpg",
        rate: 7.0,
        title: "미키 17",
      },
      {
        id: 696506,
        posterPath:
          "https://media.themoviedb.org/t/p/w440_and_h660_face/7KghOYtsxFquUuw4THbARsSEo6g.jpg",
        rate: 7.0,
        title: "미키 17",
      },
      {
        id: 696506,
        posterPath:
          "https://media.themoviedb.org/t/p/w440_and_h660_face/7KghOYtsxFquUuw4THbARsSEo6g.jpg",
        rate: 7.0,
        title: "미키 17",
      },
    ]);
  },

  set(movieList: MovieItemProps[]) {
    movieList
      .map((movieItem) => MovieItem.create(movieItem))
      .forEach((movieItem) => movieListContainer.appendChild(movieItem));
  },
};

export default MovieList;
