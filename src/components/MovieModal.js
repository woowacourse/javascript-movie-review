import { SCORE_DATA_TEXT } from '../util/constants';

const MovieModal = (movieData, genreData, starData) => {
  const rate = starData !== undefined ? starData : 0;
  const imgDatas = ['', '', '', '', '']
    .map((element, index) => {
      const compareRate = (index + 1) * 2;
      if (compareRate === rate) return '<img class="active"/>';
      return '<img>';
    })
    .join('');

  const poster =
    movieData.poster_path === null
      ? './assets/no_image.png'
      : `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  const genres = movieData.genre_ids
    .map((id) => {
      return genreData[id];
    })
    .join(', ');

  return `
        <div class="modal-container">
            <div class="modal-header">
                <span id="movie-name">${movieData.title}</span>
                <button>X</button>
            </div>
        
            <div class="modal-body">
                <img class="modal-item-thumbnail" src=${poster} alt="${movieData.title}" />
                <div class="movie-datas">
                    <div id="movie-data-frame">
                        <div id="movie-data-1">
                            <span id="genre-data">${genres}</span>
                            <span id="modal-star-data">
                                <span id="modal-star-image">
                                    <img src="./assets/star_filled.png" alt="별점" />
                                </span>
                                    <span id="modal-star-average">
                                        ${movieData.vote_average}
                                    </span>
                                </span>
                            </div>
                        <div class="data-overview">${movieData.overview}</div>
                    </div>
                    <div class="review-container">
                        <div class="review-datas">
                            <h4>내 별점</h4>
                        <div class="star">
                            <span class="star-box">${imgDatas}</span>
                        </div>
                        <div class="movie-star-result">
                            <span id="star-data">${rate}</span>
                        <span id="star-text">${SCORE_DATA_TEXT[rate]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export default MovieModal;
