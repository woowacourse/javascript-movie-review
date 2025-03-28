import Header from "./components/Header.ts";
import NavigationBar from "./components/NavigationBar.ts";
import Title from "./components/Title.ts";
import CardList from "./components/CardList.ts";
import SearchInput from "./components/SearchInput.ts";
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

    moreButton.style.display = (!isLastPage && !movieState.isLoading) ? "block" : "none";

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

    if (movieState.list.length === 0 && !movieState.isLoading) {
      const emptySection = document.createElement("section");
      emptySection.classList.add("empty-container");

      emptySection.innerHTML = `
      <img src="images/empty_logo.png" alt="우아한테크코스 로고" />
      <h2 class="empty-content">검색 결과가 없습니다.</h2>
   `;

      main.appendChild(emptySection);

      return;
    }

    const movieList = CardList({ items: movieState.list }) as HTMLElement;
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

      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = !query
        ? await movieApi.fetchPopularMovies(page)
        : await movieApi.fetchSearchedMovies(query, page);

      const movies = response.results.map(mapToMovie);

      if (isFirstLoad) {
        Skeleton.remove();
      }

      updateState({
        list: page === 1 ? movies : [...movieState.list, ...movies],
        currentPage: page,
        totalPages: response.total_pages,
        query: query || "",
        isLoading: false,
      });

      if (movies.length > 0) {
        const updatedHeader = Header({
          movie: movies[0],
        });
        header.replaceWith(updatedHeader);
      }

      return response;
    } catch (error) {
      console.error("영화 로딩 중 오류 발생:", error);

      updateState({ isLoading: false });

      if (query) {
        alert("검색 중 오류가 발생했습니다.");
      } else {
        alert("영화 정보를 가져오는 중 오류가 발생했습니다.");
      }
      return null;
    }
  };

  const searchInput = SearchInput({
    type: "text",
    placeholder: "검색어를 입력하세요",
    onSubmit: async (query: string) => {
      if (!query.trim()) {
        alert("검색어를 입력하세요.");
        return;
      }

      await fetchMovies(1, query.trim(), true);
    },
  });

  const handleClickLogo = () => {
    location.reload();
  };

  const navigationBar = NavigationBar({
    input: searchInput,
    onClick: handleClickLogo,
  });
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
