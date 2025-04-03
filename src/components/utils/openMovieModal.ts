import fetchDetailsMovie from "../../fetch/fetchDetailsMovie";
import MovieType from "../../types/MovieType";
import Modal from "../Modal";
import MovieItemModal from "../MovieItemModal";
import ratingStorage from "../../store/RatingStorage";

const openMovieModal = async (movie: MovieType) => {
  const movieDetails = await fetchDetailsMovie(movie.id);
  const initialRate = ratingStorage.get(String(movieDetails.id));

  const $modal = Modal({
    content: MovieItemModal(movieDetails, initialRate),
    onOpen: () => document.querySelector(".gnb")?.classList.add("disappear"),
    onClose: () =>
      document.querySelector(".gnb")?.classList.remove("disappear"),
  });

  document.body.appendChild($modal);
};

export default openMovieModal;
