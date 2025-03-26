import { IMovie, IPage } from "../types/domain";
import MovieItem from "./components/MovieItem";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import TextButton from "./components/TextButton";
import { IMAGE, ITEMS } from "./constants/movie.ts";
import movieApi from "./api/movieApi.ts";
import { selectElement } from "./utils/dom.ts";
import { toggleElementVisibility } from "./utils/Render.ts";
import MovieList from "./components/MovieList.ts";
import calculatePageNumber from "./domain/calculatePageNumber.ts";

const getMovieData = async (currentItemCount: number = ITEMS.initialCount) => {
  const pageNumber = calculatePageNumber(currentItemCount);

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
  toggleElementVisibility(".skeleton-list", "show");

  const movieItems = movieData.map(({ title, poster_path, vote_average }) => {
    const movieItem = new MovieItem({ title, vote_average, poster_path });
    return movieItem.create();
  });

  toggleElementVisibility(".skeleton-list", "hidden");

  return new MovieList(movieItems);
};

const mainSection = selectElement<HTMLElement>("main section");
const skeletonUl = new SkeletonUl();

const seeMoreButton = (movieListInstance: MovieList) => {
  return new TextButton({
    id: "seeMore",
    title: "더보기",
    onClick: async () => {
      const currentItemCount = movieListInstance.getTotalItems();
      const newMovieData = (await getMovieData(currentItemCount)).results;
      const movieItems = newMovieData.map(
        ({ title, poster_path, vote_average }) => {
          const movieItem = new MovieItem({ title, vote_average, poster_path });
          return movieItem.create();
        }
      );

      movieListInstance.updateList(movieItems);
    },
    type: "primary",
  });
};

const searchBar = new SearchBar();
const logo = selectElement<HTMLDivElement>(".logo");
const logoImage = selectElement<HTMLImageElement>(".logo img");

const app = async () => {
  try {
    logoImage.addEventListener("click", () => {
      window.location.reload();
    });
    const movieData = (await getMovieData()).results;

    logo.appendChild(searchBar.create());
    mainSection.appendChild(skeletonUl.create());

    renderTitleMovie(movieData);
    const totalMovieList = renderMovieData(movieData);
    totalMovieList.create();

    const seeMoreButtonInstance = seeMoreButton(totalMovieList);
    mainSection.appendChild(seeMoreButtonInstance.create());
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
};

app();
