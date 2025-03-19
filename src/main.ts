import MovieItem from "./component/MovieItem";
import MovieResults from "./domain/MovieResults";

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
  const { page: newPage, results: movieList } = await data.json();
  movieResults.addMovieList(newPage, movieList);
};

await getPopularMovieList(1);

const ulElement = document.querySelector(".thumbnail-list");
movieResults.getMovieList().forEach((movie) => {
  ulElement?.appendChild(MovieItem(movie));
});

const seeMoreElement = document.querySelector(".see-more");

seeMoreElement?.addEventListener("click", async () => {
  await getPopularMovieList(movieResults.getPage() + 1);
});
