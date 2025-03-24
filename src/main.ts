import { IMovie, IPage } from "../types/domain";
import MovieItem from "./components/MovieItem";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import TextButton from "./components/TextButton";
import { IMAGE } from "./constants/movie";
import movieApi from "./api/movieApi.ts";
import { selectElement, selectElementAll } from "./utils/dom.ts";
import { toggleSkeletonList } from "./utils/Render";

const getMovieData = async () => {
  const itemCount = selectElementAll<HTMLLIElement>(
    "ul.thumbnail-list li"
  ).length;
  const pageNumber = itemCount / 20 + 1;

  return (await movieApi.getMovieData(pageNumber)) as IPage;
};

const renderTitleMovie = (movieData: IMovie[]) => {
  const topMovieData = movieData[0];
  const movieTitle = topMovieData.title;
  const movieRate = topMovieData.vote_average;
  const movieBackdropUrl = IMAGE.backdropPrefix + topMovieData.backdrop_path;

  const topMovieTitle = selectElement<HTMLDivElement>(
    ".top-rated-movie .title"
  );
  const topMovieRateValue = selectElement<HTMLSpanElement>(
    ".top-rated-movie .rate-value"
  );
  const backgroundOverlay = selectElement<HTMLDivElement>(
    ".background-container .overlay"
  );

  topMovieTitle.textContent = movieTitle;
  topMovieRateValue.textContent = String(movieRate);
  backgroundOverlay.style.backgroundImage = `url("${movieBackdropUrl}")`;
};

const renderMovieData = (movieData: IMovie[]) => {
  toggleSkeletonList("show");

  movieData.forEach(({ title, poster_path, vote_average }) => {
    const movieItem = new MovieItem({ title, vote_average, poster_path });
    const movieItemElement = movieItem.create();
    thumbnailList.appendChild(movieItemElement);
  });

  toggleSkeletonList("hidden");
};

const thumbnailList = selectElement<HTMLUListElement>("ul.thumbnail-list");
const mainSection = selectElement<HTMLElement>("main section");
const skeletonUl = new SkeletonUl();

const seeMoreButton = new TextButton({
  id: "seeMore",
  title: "더보기",
  onClick: async () => {
    const movieData = (await getMovieData()).results;
    renderMovieData(movieData);
  },
  type: "primary",
});

const searchBar = new SearchBar();
const logo = selectElement<HTMLDivElement>(".logo");
const logoImage = selectElement<HTMLImageElement>(".logo img");

logoImage.addEventListener("click", () => {
  window.location.reload();
});
logo.appendChild(searchBar.create());
mainSection.appendChild(skeletonUl.create());
mainSection.appendChild(seeMoreButton.create());

const movieData = (await getMovieData()).results;
renderTitleMovie(movieData);
renderMovieData(movieData);
