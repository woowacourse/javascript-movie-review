import { loadMovies } from "../../main.ts";
import { $ } from "../../utils/dom.ts";

const SearchBar = () => {
  const searchBar = document.createElement("div");
  searchBar.classList.add("search-bar");

  const input = document.createElement("input");
  input.setAttribute("placeholder", "검색어를 입력하세요");
  searchBar.appendChild(input);

  const button = document.createElement("button");
  button.innerText = "🔎";
  searchBar.appendChild(button);

  button.addEventListener("click", () => {
    console.log(fetchSearchMovieList(input.value, 1));
  });

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const movies = await fetchSearchMovieList(input.value, 1);
      $(".thumbnail-list").replaceChildren();
      loadMovies(movies);
      $("#caption").innerText = `"${input.value}" 검색 결과`;
    }
  });

  return searchBar;
};

export default SearchBar;

const fetchSearchMovieList = async (search: string, currentPage: number) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${search}&language=ko-KR&page=${currentPage}`;
  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      accept: "application/json",
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
