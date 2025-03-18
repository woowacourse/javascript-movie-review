import { getMovies } from "./apis/MovieApi";
import MovieList from "./components/MovieList";
import Button from "./components/Button";
import { isElement } from "./utils";

addEventListener("load", async () => {
  let page = 1;

  const $mainSection = document.querySelector("main section");
  const $container = document.querySelector(".container");
  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  const renderMoviesList = async () => {
    const responseData = await getMovies({ page: page });
    $mainSection?.appendChild(MovieList(responseData.results));
  };

  await renderMoviesList();

  window.addEventListener("click", async (event) => {
    const { target } = event;

    if (isElement(target) && target.closest(".show-more")) {
      page = page + 1;
      await renderMoviesList();
    }
  });
});
