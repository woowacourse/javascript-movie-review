import StarRating from "../starRating/StarRating";
import Modal from "../@common/Modal";
import { images } from "../../assets/images";

interface MovieDetailModalProps {
  title: string;
  rate: number;
  src: string;
  description: string;
  genres: string;
  releaseDate: string;
  id: number;
}

const MovieDetailModal = (props: MovieDetailModalProps) => {
  const { title, rate, src, description, genres, releaseDate, id } = props;

  return `
  ${Modal({
    children: `
        <button class="close-modal" id="closeModal">
          <img src="./modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="${src}"
            />
          </div>
          <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">
              ${releaseDate} · ${genres}
            </p>
            <p class="rate">
              <img src="${images.starFilled}" class="star-filled" /><span
                >${rate}</span>
            </p>
            <hr />
            <div class="user-rating">
              <h3>내 별점</h3>
              ${StarRating({
                movieId: id,
                containerClass: `rating-container-${id}`,
              })}
            </div>
            <hr />
            <p class="detail">
              ${description}
            </p>
          </div>
        </div>
    `,
  })}
  `;
};

export default MovieDetailModal;
