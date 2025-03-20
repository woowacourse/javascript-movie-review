import { MoviesResponse } from "../../types/movieApiType";

export async function getMovies({ page }: { page: number }) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  // try {
  //   const response = await fetch(url, options);
  //   return response.json() as unknown as MoviesResponse;
  // } catch (error) {
  //   throw Error(`${error.status}`);
  // }

  const response = fetch(url, options).then((res) => {
    if (res.ok) return res.json();
    throw new Error(String(res.status));
  });

  return response as unknown as MoviesResponse;
}

export async function getMovieByName({
  name,
  page,
}: {
  name: string;
  page: number;
}) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const response = fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      throw Error(`${err.status}`);
    });
  return response as unknown as MoviesResponse;

  // return (await fetch(url, options)).json() as unknown as MoviesResponse;
}
