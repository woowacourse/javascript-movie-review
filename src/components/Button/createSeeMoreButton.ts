import { MoviePosterType } from "../MoviePosterBoard/MoviePosterBoard";
import { fetchPopularMovie, fetchTargetMovie } from "../../apis/fetchMovie";
import createButton from "./createButton";
import { MovieInfo } from "../MoviePoster/createMoviePoster";

class createSeeMoreButton {
  private buttonElement: HTMLButtonElement;
  private currentPage: number;
  private totalPage: number | null;

  constructor() {
    this.buttonElement = createButton("더보기") as HTMLButtonElement;
    this.currentPage = 1;
    this.totalPage = null;
  }

  public async getMoreMoviePoster(
    posterType: MoviePosterType,
    movieName: string
  ) {
    const fetchFunc =
      posterType === "popular" ? fetchPopularMovie : fetchTargetMovie;

    const TMDBResponse = await fetchFunc(this.currentPage, movieName);
    if (this.totalPage === null) this.totalPage = TMDBResponse.total_pages;

    if (this.currentPage === TMDBResponse?.total_pages)
      this.buttonElement.classList.add("display-none");

    this.currentPage++;

    const movieInfos: MovieInfo[] = TMDBResponse.results.map((result) => {
      return {
        id: result.id,
        title: result.title,
        imgSrc: `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`,
        rating: result.vote_average,
      };
    });

    return movieInfos;
  }

  isLastPage(): boolean {
    if (!this.totalPage) return true;
    return this.totalPage < this.currentPage ? true : false;
  }

  public get element(): HTMLButtonElement {
    return this.buttonElement;
  }
}

export default createSeeMoreButton;
