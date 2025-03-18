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

const App = () => {
  let movies: Movie[] = [];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  fetch(`${BASE_URL}/popular?language=en-US&page=1`, options)
    .then(async (res) => {
      const data = await res.json();
      movies = data.results;

      const root = document.querySelector("#wrap");
      if (root) root.innerHTML = template();
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  const template = () => /*html*/ `
      ${Header()}
      <div class="container">
        <main>
          ${MovieList(movies)}
        </main>
      </div>
      ${Footer()}
    `;
};

App();
