/// <reference types="vite/client" />

// https://app.quicktype.io/?l=ts
export interface TMDBResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

async function fetchPopularMovies() {
  const popularMovieUrl = "https://api.themoviedb.org/3/movie/popular";
  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const response = await fetch(popularMovieUrl, options);
  const { results } = (await response.json()) as TMDBResponse;

  return results;
}

async function loadPopularMovies() {
  const app = document.querySelector("#app");
  const popularMovies = await fetchPopularMovies();
  const popularMovieElements = popularMovies.map((movie) => {
    const movieElement = document.createElement("li");
    movieElement.textContent = movie.title;

    return movieElement;
  });

  const movieList = document.createElement("ul");
  movieList.classList.add("item-list");

  popularMovieElements.forEach((element) => {
    movieList.appendChild(element);
  });

  app?.appendChild(movieList);
}

addEventListener("load", () => {
  loadPopularMovies();
});
