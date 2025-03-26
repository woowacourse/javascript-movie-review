import Modal from "../@common/Modal";

interface MovieDetailModalProps {
  title: string;
  rate: number;
  src: string;
  description: string;
  genres: string;
  releaseDate: string;
}

const MovieDetailModal = (props: MovieDetailModalProps) => {
  const { title, rate, src, description, genres, releaseDate } = props;

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
              <img src="./images/star_filled.png" class="star" /><span
                >${rate}</span>
            </p>
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
