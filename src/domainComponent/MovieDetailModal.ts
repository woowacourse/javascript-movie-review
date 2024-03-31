import HeaderModal from "../components/HeaderModal/HeaderModal";
import MovieDetailWithRating from "../components/MovieDetailWithRating/MovieDetailWithRating";
import MoviePageReceiver from "../apis/MoviePageReceiver";
import createNetworkFallback from "../components/NetworkErrorFallBack/createNetworkErrorFallback";

class MovieDetailModal extends HeaderModal {
  #movieDetail;
  #fetchFunc;
  constructor(option?: {
    title?: string | undefined;
    closeAction?: ((event?: Event | undefined) => void) | undefined;
  }) {
    const movieDetail = new MovieDetailWithRating();
    const superOption = {
      ...option,
      isOpen: false,
      contents: [movieDetail.element],
    };
    super(superOption);
    this.#movieDetail = movieDetail;
    const moviePageReceiver = new MoviePageReceiver();
    this.#fetchFunc =
      moviePageReceiver.fetchMovieDetail.bind(moviePageReceiver);
  }

  setMovieDetail(movieId: string) {
    this.#fetchFunc(movieId)
      .then((movieDetail) => {
        this.setTitle(movieDetail.title);
        this.#movieDetail = new MovieDetailWithRating({
          ...movieDetail,
          thumbnailSrc: movieDetail.posterSrc,
        });
        this.replaceContents(this.#movieDetail.element);
      })
      .catch((e: Error) => {
        alert(e.stack);
        this.replaceContents(
          createNetworkFallback(() => this.setMovieDetail.bind(this)(movieId))
        );
      });
  }
}

export default MovieDetailModal;
