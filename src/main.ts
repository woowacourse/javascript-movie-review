import MostPopularMovieBanner from "./components/MostPopularMovieBanner.ts";
import NavigationBar from "./components/navigation-bar/NavigationBar.ts";
import Input from "./components/navigation-bar/Input.ts";
import {
  fetchPopularMovies,
  popularMovieList,
  searchedMovieList,
  isLastPage,
  fetchSearchedMovies,
  movieState,
} from "./store/movieService.ts";
import MovieContainer from "./components/movie-list/MovieContainer.ts";

interface HandleSearchProps {
  $title: HTMLHeadingElement;
  $mostPopularMovieBanner: HTMLElement;
  renderMovieContainer: () => void;
}

function handleSearch({
  $title,
  $mostPopularMovieBanner,
  renderMovieContainer,
}: HandleSearchProps) {
  return async (query: string) => {
    try {
      if (movieState.mode === "popular") {
        $mostPopularMovieBanner.style.display = "none";
      }

      movieState.mode = "search";
      movieState.query = query;

      await fetchSearchedMovies(query);
      renderMovieContainer();

      $title.textContent = `"${query}" 검색 결과`;
    } catch (error: unknown) {
      console.error("검색 영화 호출 중 오류 발생:", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  const $main = document.querySelector("main");
  if (!$main) return;
  const $title = document.querySelector("h2");
  if (!$title) return;
  const $root = document.querySelector("#wrap");
  if (!$root) return;

  const {
    mostPopularMovieBanner: $mostPopularMovieBanner,
    renderMostPopularMovieBanner,
  } = MostPopularMovieBanner();
  $root.prepend($mostPopularMovieBanner);

  $title.classList.add("main-title");
  $title.textContent = "지금 인기 있는 영화";

  const { renderMovieContainer } = MovieContainer({ $movieContainer: $main });

  const $input = Input({
    type: "text",
    placeholder: "검색어를 입력하세요",
    onSearch: handleSearch({
      $title,
      $mostPopularMovieBanner,
      renderMovieContainer,
    }),
  });

  const $navigationBar = NavigationBar({
    searchWrap: $input,
    routeToPopularPage: () => {
      movieState.mode = "popular";
      $title.textContent = "지금 인기 있는 영화";
      $mostPopularMovieBanner.style.display = "block";

      renderMovieContainer();
    },
  });
  $root.prepend($navigationBar);

  try {
    await fetchPopularMovies();

    if (popularMovieList.list.length > 0) {
      renderMostPopularMovieBanner();
    }

    renderMovieContainer();
  } catch (error: unknown) {
    console.error("Error in main.ts:", error);
    alert("영화 정보를 가져오는 중 오류가 발생했습니다.");
  }

  const $container = document.querySelector(".container");
  if (!$container) return;

  const throttle = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T => {
    let timeoutId: NodeJS.Timeout | null = null;

    return ((...args: Parameters<T>) => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    }) as T;
  };

  const handleScroll = async (): Promise<void> => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (scrollHeight - scrollTop - clientHeight < 10) {
      const mode = movieState.mode;
      const isLast = isLastPage(mode);

      if (isLast) {
        return;
      }

      if (mode === "popular") {
        await fetchPopularMovies(popularMovieList.currentPage + 1);
      } else if (mode === "search") {
        await fetchSearchedMovies(
          movieState.query,
          searchedMovieList.currentPage + 1
        );
      }

      renderMovieContainer();
    }
  };

  window.addEventListener("scroll", throttle(handleScroll, 300));
});
