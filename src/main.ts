import MovieResults from "./domain/MovieResults";

const movieResults = MovieResults();

const getPopularMovieList = async () => {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const data = await fetch(url, options);
  const { page, results: movieList } = await data.json();

  movieResults.addMovieList(page, movieList);
};

getPopularMovieList();
