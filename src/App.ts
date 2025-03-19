import Button from "./components/@common/Button";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MovieItem from "./components/movieItem/MovieItem";
import { reRender } from "./utils/Core";

let movies: any[] = [];

const App = () => {
  // 얘의 역할 최상위 컴포넌트
  // 모든 컴포넌트의 부모
  //영화리스트 전체를 GET해와서 Header에 영화 하나 뿌려야 댐.

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

  if (movies.length === 0) {
    fetchData();
  }

  return `
    ${Header({ rate: movies[0].vote_count, title: movies[0].title })}
    <div class="app-layout">
    <h1 class="sub-title">지금 인기 있는 영화</h1>
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
    ${Button({
      attribute: {
        class: "primary detail more-button",
      },
      children: "더 보기",
    })}
    </div>
    ${Footer()}
  `;
};

export default App;
