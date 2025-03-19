import { getPopularMovieResult } from "./api/getPopularMovieResult";
import MovieItem from "./component/MovieItem";
import MovieResults from "./domain/MovieResults";
import { IMovieResult } from "./types/movieResultType";

const movieResults = MovieResults();

const getPopularMovieList = async (page: number) => {
  const { page: newPage, results: movieList }: IMovieResult =
    await getPopularMovieResult(page);
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
