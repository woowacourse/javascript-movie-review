import "./style.css";

import createElement from "../../utils/createElement";
import CloseButton from "../Button/CloseButton";
import { fetchMovieDetail } from "../../apis/fetchMovie";
import createModal from "./common/createModal";
import starFills from "../MoviePoster/star_filled.png";
import { Genres } from "../../types/TMDBResponse";
import EditableStarRating from "../Rating/EditableStarRating";

export interface MovieDetail {
  title: string;
  genre: Genres[];
  rating: number;
  imgSrc: string;
  description: string;
}

const noMovieDescriptionText = "🎬 영화 줄거리가 등록되지 않았어요";

class MovieDetailModal {
  modalElement: HTMLElement;
  modalSection: HTMLElement;
  closeModalBind: () => void;

  constructor(movieId: string) {
    this.closeModalBind = this.closeModal.bind(this);
    this.modalElement = createModal(this.closeModalBind);
    this.modalSection = createElement({
      tagName: "section",
      attrs: {
        class: "movie-detail-section",
      },
    });
    this.modalElement.append(this.modalSection);

    this.renderMovieDetail(movieId);
  }

  private async getMovieDetailData(movieId: string) {
    const res = await fetchMovieDetail(movieId);
    if (!res?.genres) return;

    const movieDetailInfo: MovieDetail = {
      title: res.title,
      genre: res.genres,
      rating: res.vote_average,
      imgSrc: `https://image.tmdb.org/t/p/w220_and_h330_face/${res.poster_path}`,
      description: res.overview.length ? res.overview : noMovieDescriptionText,
    };

    return movieDetailInfo;
  }

  private async renderMovieDetail(movieId: string) {
    const movieDetailInfo = await this.getMovieDetailData(movieId);
    if (!movieDetailInfo) return this.closeModal();

    const movieDetailHeader = this.createMovieDetailHeader(
      movieDetailInfo.title
    );
    const movieDetailBody = this.createMovieDetailBody(movieDetailInfo);

    this.modalSection.append(movieDetailHeader, movieDetailBody);
  }

  private createMovieDetailHeader(title: string) {
    const movieDetailHeader = createElement({
      tagName: "div",
      attrs: {
        class: "movie-detail-header",
      },
    });

    const invisibleElement = createElement({
      tagName: "div",
      attrs: {
        class: "invisible-element",
      },
    });
    const movieTitle = createElement({
      tagName: "h1",
      contents: title,
    });
    const closeButton = new CloseButton(this.closeModalBind).element;

    movieDetailHeader.append(invisibleElement, movieTitle, closeButton);

    return movieDetailHeader;
  }

  private createMovieDetailBody(movieDetailInfo: MovieDetail) {
    const movieDetailContainer = createElement({
      tagName: "article",
      attrs: {
        class: "movie-detail-container",
      },
    });

    const movieImg = createElement({
      tagName: "img",
      attrs: {
        src: movieDetailInfo.imgSrc,
        class: "movie-detail-img",
      },
    });

    const movieInfoDiv = this.createMovieInfo(movieDetailInfo);

    movieDetailContainer.append(movieImg, movieInfoDiv);

    return movieDetailContainer;
  }

  private createMovieInfo(movieDetailInfo: MovieDetail): HTMLElement {
    const movieDetailWrapper = createElement({
      tagName: "div",
      attrs: {
        class: "movie-detail-wrapper",
      },
    });

    const genres = movieDetailInfo.genre.map(({ name }) => name).join();
    const movieOutline = createElement({
      tagName: "div",
      attrs: {
        class: "movie-detail-outline",
      },
    });
    const starImg = createElement({
      tagName: "img",
      attrs: {
        class: "star-img",
        src: starFills,
        alt: "별점",
      },
    });
    movieOutline.append(genres, starImg, movieDetailInfo.rating.toFixed(1));

    const movieDescription = createElement({
      tagName: "p",
      contents: movieDetailInfo.description,
      attrs: {
        class: "movie-detail-description",
      },
    });

    const editableStarRating = new EditableStarRating(movieDetailInfo.title)
      .element;

    movieDetailWrapper.append(
      movieOutline,
      movieDescription,
      editableStarRating
    );

    return movieDetailWrapper;
  }

  private closeModal() {
    this.modalElement.remove();
  }

  get element() {
    return this.modalElement;
  }
}

export default MovieDetailModal;
