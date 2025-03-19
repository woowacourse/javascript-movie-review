import MovieItem from "./component/MovieItem";
import MovieResults from "./domain/MovieResults";
import { IMovieResult } from "./types/movieResultType";

const movieResults = MovieResults();

const getPopularMovieList = async (page: number) => {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const data = await fetch(url, options);
  const { page: newPage, results: movieList }: IMovieResult = await data.json();
  movieResults.addMovieList(newPage, movieList);

  return movieList;
};

const movieList = await getPopularMovieList(1);

const ulElement = document.querySelector(".thumbnail-list");
movieList.forEach((movie) => {
  ulElement?.appendChild(MovieItem(movie));
});

const seeMoreElement = document.querySelector(".see-more");

seeMoreElement?.addEventListener("click", async () => {
  const movieList = await getPopularMovieList(movieResults.getPage() + 1);
  movieList.forEach((movie) => {
    ulElement?.appendChild(MovieItem(movie));
  });
});
