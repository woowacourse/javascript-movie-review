import { MovieResponse } from "../types/movie";
import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import Caption from "./components/movie/Caption.ts";
import LoadMoreButton from "./components/movie/LoadMoreButton.ts";
import { fetchPopularMovieList } from "./utils/api.ts";
import { $ } from "./utils/dom.ts";
import { loadMovies } from "./utils/loadMovies.ts";

let currentPage = 1;
const movieList = document.createElement("ul");
movieList.classList.add("thumbnail-list");

const wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrap");

addEventListener("load", async () => {
  const app = $("#app");

  const header = Header({ title: "인사이드 아웃2" });
  if (!header) return;
  const footer = Footer();

  const movies: MovieResponse = await fetchPopularMovieList(currentPage);

  if (app) {
    app.appendChild(wrapper);
    wrapper.appendChild(header);
    wrapper.appendChild(Caption({ title: "지금 인기 있는 영화" }));
    wrapper.appendChild(movieList);
    loadMovies(movies);

    wrapper.appendChild(
      LoadMoreButton({
        loadFn: fetchPopularMovieList,
      })
    );
    wrapper.appendChild(footer);
  }
});
