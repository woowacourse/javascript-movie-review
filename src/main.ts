import Header from "./components/Header.ts";
import NavigationBar from "./components/NavigationBar.ts";
import MovieList from "./components/MovieList.ts";
import Input from "./components/Input.ts";
import Button from "./components/Button.ts";
import { fetchMovies, moviesState } from "./store/movieService.ts";

document.addEventListener("DOMContentLoaded", async () => {
  const input = Input({
    type: "text",
    placeholder: "검색어를 입력하세요",
    onClick: () => {
      console.log("검색 아이콘 클릭");
    },
  });

  const navigationBar = NavigationBar({ input });

  const header = Header({ navigationBar, movie: null });
  const wrap = document.querySelector("#wrap");
  wrap?.prepend(header);

  const main = document.querySelector("main");
  if (!main) return;

  const renderMovies = () => {
    const movieListComponent = MovieList({
      title: "지금 인기 있는 영화",
      movieItems: moviesState.list,
    });

    main.appendChild(movieListComponent);
  };

  try {
    await fetchMovies();

    if (moviesState.list.length > 0) {
      const updatedHeader = Header({
        navigationBar,
        movie: moviesState.list[0],
      });

      header.replaceWith(updatedHeader);
    }

    renderMovies();
  } catch (error: any) {
    console.error("Error in main.ts:", error);
  }

  const button = Button({
    text: "더 보기",
    onClick: async () => {
      console.log("버튼 클릭");
      await fetchMovies(moviesState.currentPage + 1);
      renderMovies();
    },
  });

  main?.appendChild(button);
});
