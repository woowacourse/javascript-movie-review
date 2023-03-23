import { SCORE_DATA_TEXT } from '../util/constants';

const MovieModal = (data, genreData, star) => {
  const blankStar = '<img src="./assets/star_empty.png" alt="별점" />'.repeat(
    5
  );
  const filledStar = '<img src="./assets/star_filled.png" alt="별점" />'.repeat(
    5
  );

  const poster =
    data.poster_path === null
      ? './assets/no_image.png'
      : `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  const genres = data.genre_ids
    .map((id) => {
      return genreData[id];
    })
    .join(', ');

  return `
        <div class="modal-container">
            <div class="modal-header">
                <span id="movie-name">${data.title}</span>
                <button>X</button>
            <div>
        </div>
        <div>
            <img class="item-thumbnail" src=${poster} alt="${data.title}" />
            <div>
                <div id="movie-data-frame">
                    <div id="movie-data-1">
                        <span id="genre-data">${genres}</span>
                        <span id="modal-star-data">
                            <span id="modal-star-image">
                                <img src="./assets/star_filled.png" alt="별점" />
                            </span>
                                <span id="modal-star-average">
                                    ${data.vote_average}
                                </span>
                            </span>
                        </div>
                    <div id="data-overview">${data.overview}</div>
                </div>
                <div id="review-container">
                    <div id="review-datas">
                        <h4>내 별점</h4>
                            <span class="star">
                                ${blankStar}
                                <span class="star-filled" style="width:${
                                  (star / 2) * 20
                                }%">
                                    ${filledStar}
                                </span>
                                <input type="range" value="${
                                  !star ? 0 : star / 2
                                }" step="1" min="1" max="5">
                            </span>
                        <span id="star-data">${star}</span>
                        <span id="star-text">${
                          !star ? '' : SCORE_DATA_TEXT[star]
                        }</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export default MovieModal;
