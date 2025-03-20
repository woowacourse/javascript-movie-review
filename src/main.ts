import Header from "./components/Header.ts";
import NavigationBar from "./components/NavigationBar.ts";
import MovieList from "./components/MovieList.ts";
import Input from "./components/Input.ts";
import Button from "./components/Button.ts";
import {
  fetchPopularMovies,
  moviesState,
  isLastPage,
  fetchSearchedMovies,
} from "./store/movieService.ts";

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main");
  if (!main) return;

  const input = Input({
    type: "text",
    placeholder: "검색어를 입력하세요",
    onSearch: async (query: string) => {
      try {
        const searchedMovies = await fetchSearchedMovies(query);

        console.log(">>> 검색 결과:", searchedMovies);

        main.innerHTML = "";
        const movieListComponent = MovieList({
          movieItems: searchedMovies,
        });
        main.appendChild(movieListComponent);
      } catch (error: any) {
        console.error("검색 영화 호출 중 오류 발생:", error);
      }
    },
  });

  const navigationBar = NavigationBar({ input });

  const header = Header({ navigationBar, movie: null });
  const wrap = document.querySelector("#wrap");
  wrap?.prepend(header);

  const title = document.querySelector("h2");
  if (!title) return;
  title.classList.add("main-title");
  title.textContent = "지금 인기 있는 영화";

  const renderMovies = () => {
    const movieListComponent = MovieList({
      movieItems: moviesState.list,
    });

    main.appendChild(movieListComponent);
  };

  try {
    await fetchPopularMovies();

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

  const container = document.querySelector(".container");
  if (!container) return;

  // TODO 검색 결과 없으면 버튼 사라지도록 처리
  const moreButton = Button({
    text: "더 보기",
    onClick: async () => {
      if (isLastPage()) {
        alert("마지막 페이지입니다.");
        moreButton.setAttribute("disabled", "true");
        return;
      }
      await fetchPopularMovies(moviesState.currentPage + 1);
      renderMovies();
    },
  });

  container?.appendChild(moreButton);
});
