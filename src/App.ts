import Header from "./components/header/Header";
import MovieItem from "./components/movieItem/MovieItem";
import { reRender } from "./utils/Core";

let movies: any[] = [];

const App = () => {
  // 얘의 역할 최상위 컴포넌트
  // 모든 컴포넌트의 부모
  //영화리스트 전체를 GET해와서 Header에 영화 하나 뿌려야 댐.

  if (movies.length === 0) {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        method: "GET",
      });
      const data = await response.json();
      movies = data.results;
      console.log("movies", movies);
      reRender();
    };
    fetchData();
  }

  return `
    ${Header({ rate: 9.5, title: "인사이드 아웃2" })}
    <ul class="thumbnail-list">
    ${movies
      .map((movie) =>
        MovieItem({
          title: movie.title,
          rate: movie.vote_count,
          src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })
      )
      .join("")}
    </ul>
  `;
};

export default App;
