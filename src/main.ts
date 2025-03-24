import { MovieResponse } from "../types/movie";
import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import Caption from "./components/movie/Caption.ts";
import LoadMoreButton from "./components/movie/LoadMoreButton.ts";
import MovieList from "./components/movie/MovieList.ts";
import NoSearchResults from "./components/movie/NoSearchResults.ts";
import SkeletonMovieItem from "./components/movie/SkeletonMovieItem.ts";
import { fetchPopularMovieList } from "./utils/api.ts";
import { $ } from "./utils/dom.ts";

let currentPage = 1;
const movieList = document.createElement("ul");
movieList.classList.add("thumbnail-list");

const wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrap");

addEventListener("load", async () => {
  const app = $("#app");

  const header = Header({ title: "로딩중 ...", imageUrl: "", voteAverage: 0 });
  const footer = Footer();

  if (app) {
    app.appendChild(wrapper);
    wrapper.appendChild(header);
    wrapper.appendChild(Caption({ title: "지금 인기 있는 영화" }));
    wrapper.appendChild(movieList);

    const fragment = document.createDocumentFragment();
    fragment.append(...Array.from({ length: 20 }).map(SkeletonMovieItem));
    movieList.appendChild(fragment);

    try {
      const movies: MovieResponse = await fetchPopularMovieList(currentPage);
      const topMovie = movies.results[0];

      if (topMovie) {
        const updatedHeader = Header({
          title: topMovie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${topMovie.poster_path}`,
          voteAverage: topMovie.vote_average,
        });

        if (updatedHeader) wrapper.replaceChild(updatedHeader, header);
      }

      MovieList(movies);

      wrapper.appendChild(
        LoadMoreButton({
          loadFn: fetchPopularMovieList,
        })
      );
    } catch (error) {
      wrapper.appendChild(NoSearchResults("영화 목록을 가져오지 못했습니다."));
    }

    app.appendChild(footer);
  }
});
