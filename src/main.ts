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

addEventListener("load", () => {
  getMoviePopular({ page: 2 }).then((res) => {
    console.log(res);
  });
});
