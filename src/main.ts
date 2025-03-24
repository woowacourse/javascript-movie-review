import Header from "./components/Header.ts";
import NavigationBar from "./components/NavigationBar.ts";
import MovieList from "./components/MovieList.ts";
import Input from "./components/Input.ts";
import Button from "./components/Button.ts";
import {
  fetchPopularMovies,
  moviesPopularState,
  moviesSearchedState,
  isLastPage,
  fetchSearchedMovies,
} from "./store/movieService.ts";
import { MovieState } from "../types/movie.ts";
import Title from "./components/Title.ts";

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main");
  const wrap = document.querySelector("#wrap");
  if (!main || !wrap) return;

  const header = Header({ movie: null });
  wrap.prepend(header);

  const movieSectionTitle = Title({
    text: "지금 인기 있는 영화",
  });

  main.appendChild(movieSectionTitle);

  const movieState: MovieState = {
    mode: "popular",
    query: "",
  };

  const searchInput = Input({
    type: "text",
    mode: "search",
    placeholder: "검색어를 입력하세요",
    onSubmit: async (query: string) => {
      try {
        if (header.parentElement) {
          header.remove();
        }

        movieState.mode = "search";
        movieState.query = query;

        const searchedMovies = await fetchSearchedMovies(query);

        main.innerHTML = "";

        const movieListComponent = MovieList({
          movieItems: searchedMovies,
        }) as HTMLElement;

        const searchedMovieTitle = Title({
          text: `"${query}" 검색 결과`,
        });

        main.appendChild(searchedMovieTitle);
        main.appendChild(movieListComponent);
      } catch (error: unknown) {
        console.error("검색 영화 호출 중 오류 발생:", error);
        alert("검색 중 오류가 발생했습니다.");
      }
    },
  });

  const navigationBar = NavigationBar({ input: searchInput });
  wrap?.prepend(navigationBar);

  const renderMovies = () => {
    const movieItems =
      movieState.mode === "popular"
        ? moviesPopularState.list
        : moviesSearchedState.list;

    const movieListComponent = MovieList({ movieItems }) as HTMLElement;
    main.appendChild(movieListComponent);
  };

  try {
    await fetchPopularMovies();

    if (moviesPopularState.list.length > 0) {
      const updatedHeader = Header({
        movie: moviesPopularState.list[0],
      });

      header.replaceWith(updatedHeader);
    }

    renderMovies();
  } catch (error: unknown) {
    console.error("Error in main.ts:", error);
    alert("영화 정보를 가져오는 중 오류가 발생했습니다.");
  }

  const container = document.querySelector(".container");
  if (!container) return;

  const moreButton = Button({
    text: "더 보기",
    onClick: async () => {
      if (movieState.mode === "popular") {
        if (isLastPage("popular")) {
          moreButton.style.display = "none";
          alert("마지막 페이지입니다.");

          return;
        }

        await fetchPopularMovies(moviesPopularState.currentPage + 1);
        renderMovies();
      } else if (movieState.mode === "search") {
        if (isLastPage("search")) {
          moreButton.style.display = "none";
          alert("마지막 페이지입니다.");

          return;
        }

        await fetchSearchedMovies(
          movieState.query,
          moviesSearchedState.currentPage + 1
        );
        renderMovies();
      }
    },
  });

  container.appendChild(moreButton);
});
