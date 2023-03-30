import star_filled from '../../templates/star_filled.png';
import star_empty from '../../templates/star_empty.png';

class MovieDetail {
  $modal = document.createElement('div');

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$modal.classList = 'movie-detail-modal hidden';
  }

  render($target) {
    $target.insertAdjacentElement('afterbegin', this.$modal);
  }

  bindEvent() {
    window.onkeyup = ({ keyCode }) => {
      if (keyCode === 27 || keyCode === 8) {
        this.close();
      }
    };

    this.$modal.addEventListener('click', ({ target: { className } }) => {
      if (
        className === 'movie-detail-close-button' ||
        className === 'movie-detail-modal-background'
      ) {
        this.close();
      }
    });

    this.$modal.addEventListener('click', ({ target }) => {
      const { id: score, className } = target;
      if (className !== 'star') return;

      const $stars = document.querySelectorAll(`.${className}`);
      [...$stars].forEach(($star, index) => {
        if (index < Number(score)) {
          $star.src = star_filled;
          $star.alt = star_filled;
        } else {
          $star.src = star_empty;
          $star.alt = star_empty;
        }
      });

      document.querySelector('.review-score').innerText = score * 2;

      const movieId = this.$modal.id;

      document.dispatchEvent(new CustomEvent('updateReviewScore', { detail: { movieId, score } }));
    });
  }

  open(movie) {
    this.$modal.id = movie.id;
    this.$modal.classList.remove('hidden');

    this.$modal.innerHTML = this.getTemplate(movie);
  }

  close() {
    this.$modal.classList.add('hidden');
  }

  getTemplate({ genres, title, overview, poster_path, vote_average, reviewScore }) {
    const template = `
      <div class="movie-detail">
        <div class="movie-detail-top">
          <h2 class="movie-detail-top-title">${title}</h2>
          <button class="movie-detail-close-button">X</button>
        </div>
        <div class="movie-detail-content-box">
        ${
          poster_path
            ? `<img
              class="movie-detail-thumbnail skeleton"
              src="https://image.tmdb.org/t/p/w500/${poster_path}"
              loading="lazy"
              alt="${title}"
            />`
            : `<div class="movie-detail-thumbnail no-image">
              <span>No Image</span>
            </div>`
        }
          <div class="movie-detail-content">
            <div>
              <div class="movie-detail-genres-vote">
                <div class="movie-detail-genres">${genres
                  .map((genres) => genres.name)
                  .join(', ')}</div>
                <div class="movie-detail-vote">
                  <img src=${star_filled} alt=${star_filled}/>
                  <span>${vote_average.toFixed(1)}</span>
                </div>
              </div>
              <p class="movie-detail-overview">${overview}</p>
            </div>
            <div class="movie-assessment">
              <div>
                <span>내 별점</span>
              </div>
              <div>
                ${Array.from({ length: 5 }).reduce((starImages, _, index) => {
                  const id = index + 1;

                  const starImg =
                    id <= reviewScore
                      ? `<img id=${id} class="star" src=${star_filled} alt=${star_filled}/>`
                      : `<img id=${id} class="star" src=${star_empty} alt=${star_empty}/>`;

                  return starImages + starImg;
                }, '')}
              </div>
              <div>
                <span class="review-score">${reviewScore * 2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="movie-detail-modal-background"></div>`;

    return template;
  }
}

export default MovieDetail;
