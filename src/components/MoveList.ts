import MovieClient from "../http/MoveClient";
import { MovieItem } from "../types/movies";
import { createMovie } from "./Movie";
import { BASE_URL } from "../constants/movies";

/* 
api 호출할 때, 몇번 째 페이지를 요청하고 있는지를 가지고 있어야 되지 않나??
*/
// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => (movieList = json))
//   .catch((err) => console.error("error:" + err));

const movieClient = new MovieClient(BASE_URL);

async () => {
  const url =
    "movie/popular?" +
    new URLSearchParams({
      language: "ko-KR",
      page: "1",
    });
  const result = await movieClient.fetch(url);

  console.log(result.json());
};

class MoveList {
  private currentPage: number = 1;
}

export default MoveList;

export const createMovieList = (page: Number) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };
  let movieList: MovieItem[] = [
    {
      id: 1,
      title: "hello",
      imgPath: "213213",
      voteAverage: 6.5,
    },
  ];

  //   console.log(movieList);
  return /*html*/ `
    <ul class="item-list">
        ${movieList.map((movie) => `${movie.id}`).join("")}
    </ul>
  `;
};
