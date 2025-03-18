import getPopularMovieList from "./apis/getPopularMovieList";
import $SearchBox from "./components/SearchBox/SearchBox";
import $MovieListSection from "./components/MovieListSection/MovieListSection";

const app = document.querySelector("#wrap");
const footer = document.querySelector("footer")!;

const data = await getPopularMovieList(1);
app?.insertBefore(
  $MovieListSection({
    title: "지금 인기 있는 영화",
    movieList: data.results,
  }),
  footer
);

const topRatedContainer = document.querySelector(".top-rated-container")!;
topRatedContainer.prepend($SearchBox());
