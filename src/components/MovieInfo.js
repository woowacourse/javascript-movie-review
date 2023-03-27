import { ratingService } from '..';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const RATING_TEXT = {
  [-1]: '우웩',
  0: '최악이예요',
  1: '별로예요',
  2: '보통이에요',
  3: '재미있어요',
  4: '명작이에요',
};

export default class MovieInfo {
  template(movie) {
    const { id, poster_path, title, genres, vote_average, overview } = movie;

    return {
      title,
      content: `
        <div id="js-movie-info" class="movie-info" data-id="${id}">
          <div class="movie-poster">
            <img src="${IMAGE_BASE}${poster_path}" alt="${title}" width="100%" height="100%" />
          </div>
          <div class="movie-summary">
            <p class="movie-genre">${genres.map(({ name }) => name).join(', ')}</p>
            <p class="movie-vote_average">
              <i class="rating-icon rating-icon--star fa fa-star"></i>
              <div style="margin-left: 6px;">${vote_average.toFixed(1)}</div>
            </p>
          </div>
          <p class="movie-overview">${overview || '등록된 줄거리가 없습니다.'}</p>
          <menu class="movie-star_rating">
            <span>내 별점</span>
            <div id="js-rating-group" class="rating-group">
              <label aria-label="0" class="rating-label" for="rating-0">&nbsp;</label>
              <input class="rating-input rating-input--none" checked name="rating" id="rating-0" value="0" type="radio">
              ${this.ratingTemplate(10)}
            </div>
            <span id="js-my_rating" class="movie-my_rating"></span>
            <span id="js-my_rating-text" class="movie-my_rating">별점을 입력해주세요</span>
          </menu>
        </div>
      `,
    };
  }

  ratingTemplate(length) {
    return Array.from({ length }, (_, i) => {
      const index = i + 1;
      const isOdd = index % 2 === 1;

      return `
          <label aria-label="${index}" class="rating-label ${
        isOdd ? 'rating-label--half' : ''
      }" for="rating-${index}">
            <i class="rating-icon rating-icon--star fa ${isOdd ? 'fa-star-half' : 'fa-star'}"></i>
          </label>
          <input class="rating-input" name="rating" id="rating-${index}" value="${index}" type="radio">
      `;
    }).join('');
  }

  bindEvent() {
    const ratingGroup = document.querySelector('#js-rating-group');

    const id = document.querySelector('#js-movie-info').getAttribute('data-id');
    const rating = ratingService.findRatingById(id);

    if (rating) {
      const inputs = ratingGroup.querySelectorAll('input');
      const input = Array.from(inputs).find((input) => input.value === rating);
      input.checked = true;
      document.querySelector('#js-my_rating').textContent = rating;
      document.querySelector('#js-my_rating-text').textContent =
        RATING_TEXT[Math.floor((rating - 1) / 2)];
    }

    ratingGroup.addEventListener('click', (event) => {
      const label = event.target.closest('label');
      if (!label) return;

      const myRating = document.querySelector('#js-my_rating');
      const myRatingText = document.querySelector('#js-my_rating-text');
      const rating = label.getAttribute('aria-label');
      const ratingText = RATING_TEXT[Math.floor((rating - 1) / 2)];
      myRating.textContent = rating;
      myRatingText.textContent = ratingText;

      const id = document.querySelector('#js-movie-info').getAttribute('data-id');
      ratingService.update(id, rating);
    });
  }
}
