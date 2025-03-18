import movieList from "./components/movie/movieList";

const url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
    const { results, page } = json;
    movieList(results);
  })
  .catch((err) => console.error(err));
