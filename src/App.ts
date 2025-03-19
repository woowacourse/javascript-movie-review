import Button from "./components/@common/Button";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MovieItem from "./components/movieItem/MovieItem";
import Skeleton from "./components/skeleton/Skeleton";
import {
  movies,
  searchInputValue,
  searchResults,
  currentPage,
  setMovies,
  appendMovies,
  appendSearchResults,
  totalResults,
  isLoading,
  setIsLoading,
  setIsError,
  isError,
  isMoreError,
  setIsMoreError,
  isSearchError,
  setTotalResults,
} from "./store/store";
import { useEvents } from "./utils/Core";

const App = () => {
  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}=${page}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        method: "GET",
      });
      const data = await response.json();
      if (data) setIsLoading(false);
      console.log("data", data);
      setTotalResults(data.total_results);
      return data.results;
    } catch (error) {
      setIsError(true);
      console.error("Error fetching data in App:", error);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;

    if (searchInputValue.trim()) {
      // 검색 결과가 있으면

      const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=${nextPage}&query=${encodeURIComponent(
        searchInputValue
      )}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        appendSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsMoreError(true);
      }
    } else {
      const newMovies = await fetchData(nextPage);
      if (newMovies) {
        appendMovies(newMovies);
      }
    }
  };

  const [addEvent] = useEvents(".app-layout");

  addEvent("click", ".more-button", (e) => {
    e.preventDefault();
    handleLoadMore();
  });

  if (movies.length === 0) {
    fetchData(1).then((results) => {
      if (results) setMovies(results);
    });
  }

  const displayMovieList =
    searchInputValue.trim().length > 0 ? searchResults : movies;

  return ` ${
    isError || !movies.length
      ? `<div class="movie-list-error">에러가 발생했습니다. 다시 시도해주세요.</div>`
      : Header({
          rate: movies[0]?.vote_count ?? 0, // Optional chaining과 Nullish coalescing 사용
          title: movies[0]?.title ?? "",
        })
  }
  
    <div class="app-layout">
      <h1 class="sub-title">${
        searchInputValue.length > 0
          ? `${searchInputValue} 검색 결과`
          : "지금 인기 있는 영화"
      }</h1>

      ${
        isSearchError
          ? `<div class="no-results">검색 결과를 불러오는데 실패하였습니다.</div>`
          : ""
      }
      ${
        searchInputValue.length > 0 && displayMovieList.length === 0
          ? `<div class="no-results">검색 결과가 없습니다.</div>`
          : `<ul class="thumbnail-list">
              ${displayMovieList
                .map((movie) => {
                  return isLoading
                    ? Skeleton()
                    : MovieItem({
                        title: movie.title,
                        rate: movie.vote_count,
                        src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      });
                })
                .join("")}
            </ul>
      ${isMoreError ? `<div>영화 목록을 불러오는 데 실패했습니다.</div>` : ""}
    ${
      //더 불러올 영화가 없을 때는 버튼을 보여주지 않음
      totalResults === searchResults.length
        ? ""
        : Button({
            attribute: {
              class: "primary detail more-button",
            },
            children: "더 보기",
          })
    }`
      }
    </div>
    ${Footer()}
    `;
};

export default App;
