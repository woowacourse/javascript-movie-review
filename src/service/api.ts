import { apiUrl, apiKey } from "../constants/env";

export const getMoviePopular = ({ page }: { page: number }) => {
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
