import { Response } from "../types/response";
import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import Caption from "./components/movie/Caption.ts";
import LoadMoreButton from "./components/movie/LoadMoreButton.ts";
import MovieList from "./components/movie/MovieList.ts";
import NoSearchResults from "./components/movie/NoSearchResults.ts";
import hideSkeleton from "./components/utils/hideSkeleton.ts";
import showSkeleton from "./components/utils/showSkeleton.ts";
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

    showSkeleton();

    const movies: Response = await fetchPopularMovieList(currentPage);

    if (movies.status === "fail") {
      wrapper.appendChild(NoSearchResults("영화 목록을 가져오지 못했습니다."));
    }

    if (movies.status === "success") {
      const topMovie = movies.data.results[0];
      if (topMovie) {
        const updatedHeader = Header({
          title: topMovie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${topMovie.poster_path}`,
          voteAverage: topMovie.vote_average,
        });

        if (updatedHeader) wrapper.replaceChild(updatedHeader, header);
      }

      MovieList(movies.data);

      wrapper.appendChild(
        LoadMoreButton({
          loadFn: fetchPopularMovieList,
        })
      );
    }

    hideSkeleton();
    app.appendChild(footer);
  }
});
