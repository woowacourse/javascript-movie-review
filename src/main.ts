import { apiUrl, apiKey } from "./constants/env.ts";

const getMoviePopular = ({ page }: { page: number }) => {
  const url = `${apiUrl}/movie/popular?page=${page}`;
  return fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }).then((res) => {
    return res.json();
  });
};

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

addEventListener("load", () => {
  getMoviePopular({ page: 1 }).then((movies: Movies) => {
    const thumbnailList = document.querySelector(".thumbnail-list");
    const itemList = document.querySelector<HTMLTemplateElement>(`#movie-item`);

    if (!itemList) return;

    movies.results.forEach((movie: Movie) => {
      const item = itemList.content.cloneNode(true) as DocumentFragment;

      const thumbnail = item.querySelector<HTMLImageElement>(".thumbnail");
      if (!thumbnail) return;
      thumbnail.src =
        `https://media.themoviedb.org/t/p/w220_and_h330_face` +
        movie.poster_path;
      thumbnail.alt = movie.title;

      const itemDesc = item.querySelector(".item-desc");

      const rate = itemDesc?.querySelector<HTMLSpanElement>("span");
      if (!rate) return;
      rate.textContent = movie.vote_average.toString();

      const title = itemDesc?.querySelector<HTMLElement>("strong");
      if (!title) return;
      title.textContent = movie.title;

      thumbnailList?.appendChild(item);
    });
  });
});
