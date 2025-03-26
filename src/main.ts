import Header from "./components/Header.ts";
import NavigationBar from "./components/NavigationBar.ts";
import Title from "./components/Title.ts";
import CardList from "./components/CardList.ts";
import Input from "./components/Input.ts";
import Button from "./components/Button.ts";
import Skeleton from "./components/Skeleton.ts";
import { Movie } from "../types/movie.ts";
import { mapToMovie } from "./store/movieMapper.ts";
import { movieApi } from "./api/movieApi.ts";

type MovieState = {
  list: Movie[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  query: string;
};

const initialMovieState: MovieState = {
  list: [] as Movie[],
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  query: "",
};

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main");
  const wrap = document.querySelector("#wrap");
  if (!main || !wrap) return;

  const movieState: MovieState = { ...initialMovieState };

  const header = Header({ movie: null });
  wrap.prepend(header);

  const renderTitle = () => {
    const movieSectionTitle = Title({
      text: "지금 인기 있는 영화",
    });

    main.appendChild(movieSectionTitle);
  };

  renderTitle();

  const updateState = (state: Partial<MovieState>) => {
    if (state.list !== undefined) movieState.list = state.list;
    if (state.currentPage !== undefined)
      movieState.currentPage = state.currentPage;
    if (state.totalPages !== undefined)
      movieState.totalPages = state.totalPages;
    if (state.isLoading !== undefined) movieState.isLoading = state.isLoading;
    if (state.query !== undefined) movieState.query = state.query;

    const isLastPage = movieState.currentPage === movieState.totalPages;

    moreButton.style.display = isLastPage ? "none" : "block";

    renderMovies();
  };

  const renderMovies = () => {
    main.innerHTML = "";

    if (movieState.query) {
      const headerElement = document.getElementById("app-header");
      if (headerElement) {
        headerElement.remove();
      }

      const searchedMovieTitle = Title({
        text: `"${movieState.query}" 검색 결과`,
      });

      searchedMovieTitle.classList.add("search-result-title");
      main.appendChild(searchedMovieTitle);
    } else {
      renderTitle();
    }

    const movieList = CardList({ movieItems: movieState.list }) as HTMLElement;
    main.appendChild(movieList);

    if (movieState.isLoading) {
      Skeleton.render(main);
    }
  };

  const fetchMovies = async (
    page: number,
    query?: string,
    isFirstLoad = false
  ) => {
    try {
      updateState({ isLoading: true });

      if (isFirstLoad) {
        updateState({ list: [] });
      }

      const response = !query
        ? await movieApi.fetchPopularMovies(page)
        : await movieApi.fetchSearchedMovies(query, page);

      console.log(response);

      updateState({
        list: response.results.map(mapToMovie),
        currentPage: page,
        totalPages: response.total_pages,
        query: query || "",
        isLoading: false,
      });

      if (movieState.list.length > 0) {
        const updatedHeader = Header({
          movie: movieState.list[0],
        });
        header.replaceWith(updatedHeader);
      }

      return response;
    } catch (error) {
      console.error("영화 로딩 중 오류 발생:", error);

      if (query) {
        alert("검색 중 오류가 발생했습니다.");
      }
      alert("영화 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const searchInput = Input({
    type: "text",
    mode: "search",
    placeholder: "검색어를 입력하세요",
    onSubmit: async (query: string) => {
      if (!query.trim()) {
        alert("검색어를 입력하세요.");
        return;
      }

      await fetchMovies(1, query.trim(), true);
    },
  });

  const navigationBar = NavigationBar({ input: searchInput });
  wrap?.prepend(navigationBar);

  const container = document.querySelector(".container");
  if (!container) return;

  const moreButton = Button({
    text: "더 보기",
    onClick: async () => {
      if (movieState.currentPage === movieState.totalPages) {
        alert("마지막 페이지입니다.");
        return;
      }

      await fetchMovies(movieState.currentPage + 1, movieState.query);
    },
  });

  const loadInitialMovies = async () => {
    Skeleton.render(main);
    await fetchMovies(1, "", true);
    container.appendChild(moreButton);
  };

  loadInitialMovies();
});
