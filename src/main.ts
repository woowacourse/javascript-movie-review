import Header from "./components/Header.ts";
import NavigationBar from "./components/NavigationBar.ts";
import Title from "./components/Title.ts";
import CardList from "./components/CardList.ts";
import Input from "./components/Input.ts";
import Button from "./components/Button.ts";
import { Movie, MovieState, MovieType } from "../types/movie.ts";
import { mapToMovie } from "./store/movieMapper.ts";
import { movieApi } from "./api/movieApi.ts";

const moviesPopularState = {
  list: [] as Movie[],
  currentPage: 1,
  totalPages: 0,
};

const moviesSearchedState: typeof moviesPopularState = {
  list: [] as Movie[],
  currentPage: 1,
  totalPages: 0,
};

const isLastPage = (movieType: MovieType) => {
  if (movieType === "popular") {
    return moviesPopularState.currentPage === moviesPopularState.totalPages;
  }

  if (movieType === "search") {
    return moviesSearchedState.currentPage === moviesSearchedState.totalPages;
  }

  return false;
};

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
        const headerElement = document.getElementById("app-header");
        if (headerElement) {
          headerElement.remove();
        }

        movieState.mode = "search";
        movieState.query = query;

        const searchedMovies = await movieApi.fetchSearchedMovies(query);

        moviesSearchedState.list = searchedMovies.results.map((item: any) =>
          mapToMovie(item)
        );
        moviesSearchedState.currentPage = 1;
        moviesSearchedState.totalPages = searchedMovies.total_pages;

        main.innerHTML = "";

        updateMoreButtonVisibility();

        const movieListComponent = CardList({
          movieItems: searchedMovies,
        }) as HTMLElement;

        const searchedMovieTitle = Title({
          text: `"${query}" 검색 결과`,
        });

        searchedMovieTitle.classList.add("search-result-title");

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

  const container = document.querySelector(".container");
  if (!container) return;

  const moreButton = Button({
    text: "더 보기",
    onClick: async () => {
      const popularMode = movieState.mode === "popular";
      const searchMode = movieState.mode === "search";
      const movieType = popularMode ? "popular" : "search";

      if (isLastPage(movieType)) {
        alert("마지막 페이지입니다.");
        return;
      }

      if (popularMode) {
        await movieApi.fetchPopularMovies(moviesPopularState.currentPage + 1);
      } else if (searchMode) {
        await movieApi.fetchSearchedMovies(
          movieState.query,
          moviesSearchedState.currentPage + 1
        );
      }

      renderMovies();
    },
  });

  container.appendChild(moreButton);

  const updateMoreButtonVisibility = () => {
    const movieType = movieState.mode === "popular" ? "popular" : "search";
    moreButton.style.display = isLastPage(movieType) ? "none" : "block";
  };

  const renderMovies = () => {
    const movieItems =
      movieState.mode === "popular"
        ? moviesPopularState.list
        : moviesSearchedState.list;

    const movieListComponent = CardList({ movieItems }) as HTMLElement;
    main.appendChild(movieListComponent);

    updateMoreButtonVisibility();
  };

  try {
    const popularMovies =  await movieApi.fetchPopularMovies();

    moviesPopularState.list = popularMovies.results.map(mapToMovie);
    moviesPopularState.currentPage = 1;
    moviesPopularState.totalPages = popularMovies.total_pages;

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
});
