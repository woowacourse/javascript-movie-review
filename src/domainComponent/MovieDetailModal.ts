import HeaderModal from "../components/HeaderModal/HeaderModal";
import MovieDetailWithRating from "../components/MovieDetailWithRating/MovieDetailWithRating";
import MoviePageReceiver from "../apis/MoviePageReceiver";
import StorageInterface from "../storage/StorageInterface";
import createNetworkFallback from "../components/NetworkErrorFallBack/createNetworkErrorFallback";

class MovieDetailModal extends HeaderModal {
  #movieDetail;
  #fetchFunc;
  #storage = new StorageInterface();
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
    this.replaceContents();
    this.setTitle("");
    //skeleton
    this.#fetchFunc(movieId)
      .then((movieDetail) => {
        this.setTitle(movieDetail.title);
        this.#movieDetail = new MovieDetailWithRating({
          ...movieDetail,
          thumbnailSrc: movieDetail.posterSrc,
          userRating:
            this.#storage.getMovieInfo(movieId)?.userRating.toString() ?? "0",
          setRatingAction: (rating: number) => {
            this.#storage.setMovieInfo.bind(this.#storage)(movieId, {
              userRating: rating,
            });
          },
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
