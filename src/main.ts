import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieList from "./components/MovieList";

export interface Movie {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
}

export const BASE_URL = "https://api.themoviedb.org/3/movie";

const App = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  const raw = await fetch(`${BASE_URL}/popular?language=en-US&page=1`, options);
  const data = await raw.json();
  const movies: Movie[] = data.results;
  const topRatedMovie: Movie = movies[0];

  const root = document.querySelector("#wrap");

  root?.insertAdjacentHTML("afterbegin", Header(topRatedMovie));

  const main = document.querySelector("main");
  main?.insertAdjacentHTML("afterbegin", MovieList(movies));

  root?.insertAdjacentHTML("beforeend", Footer());
};

App();
