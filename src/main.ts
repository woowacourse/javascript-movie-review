import MovieList from "./components/MovieList";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

async function getPopularMovies() {
  const response = await fetch(
    `${import.meta.env.VITE_REQUEST_URL}/movie/popular?language=ko-KR&page=1`,
    options
  );

  if (response.status === 200) {
    const data = await response.json();
    const movieList = new MovieList(data.results);
    const $listContainer = movieList.renderMovieList();
    const $section = document.querySelector("section");
    $section?.appendChild($listContainer);
  }
}

getPopularMovies();
