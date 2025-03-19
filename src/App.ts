import Button from "./components/@common/Button";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MovieItem from "./components/movieItem/MovieItem";
import {
  movies,
  searchInputValue,
  searchResults,
  currentPage,
  setMovies,
  appendMovies,
  appendSearchResults,
  totalResults,
} from "./store/store";
import { useEvents } from "./utils/Core";

const App = () => {
  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
          method: "GET",
        }
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
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

  console.log("searchResults", searchResults);
  console.log("movies", movies);

  return ` 
    ${Header({
      rate: movies[0].vote_count,
      title: movies[0].title,
    })}
    <div class="app-layout">
      <h1 class="sub-title">${
        searchInputValue.length > 0
          ? `${searchInputValue} 검색 결과`
          : "지금 인기 있는 영화"
      }</h1>
      ${
        searchInputValue.length > 0 && displayMovieList.length === 0
          ? `<div class="no-results">검색 결과가 없습니다.</div>`
          : `<ul class="thumbnail-list">
              ${displayMovieList
                .map((movie) =>
                  MovieItem({
                    title: movie.title,
                    rate: movie.vote_count,
                    src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  })
                )
                .join("")}
            </ul>
     ${
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
