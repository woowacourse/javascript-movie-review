import { getMovies } from "./apis/MovieApi";

addEventListener("load", async () => {
  const responseData = await getMovies();
  console.log(responseData);
});
