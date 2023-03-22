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
            <span id="movie-name">${data.title}</span>
            <button>X</button>
        </div>
        <div>
            <img class="item-thumbnail" src=${poster} alt="${data.title}" />
            <div>
                <div>
                    <div>${genres}<img src="./assets/star_filled.png" alt="별점" />${
    data.vote_average
  }</div>
                    <div>${data.overview}</div>
                </div>
                <div>
                내 별점
                    <span class="star">
                        ${blankStar}
                        <span style="width:${(star / 2) * 20}%">
                            ${filledStar}
                        </span>
                        <input type="range" value="${
                          !star ? 0 : star / 2
                        }" step="1" min="1" max="5">
                    </span>
                    <span id="star-data">${star}</span>
                    <span id="star-text">${
                      !star ? '점수를 부여해주세요' : SCORE_DATA_TEXT[star]
                    }</span>
                </div>
            </div>
        </div>
    `;
};

export default MovieModal;
