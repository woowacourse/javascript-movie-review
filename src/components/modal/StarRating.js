import MovieRatingStorage from '../../utils/storage/MovieRatingStorage.js';

class StarRating {
  constructor(movie) {
    this.movie = movie;
    this.ratingStorage = new MovieRatingStorage();
    this.userRating = this.ratingStorage.getRating(this.movie.id) || 0;
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('star-rating');
    container.innerHTML = /*html*/`
      <div class="star-rating-item">
        <span class="empty-star" data-rating="1"><img src="./images/star_empty.png" class="star" /></span>
        <span class="empty-star" data-rating="2"><img src="./images/star_empty.png" class="star" /></span>
        <span class="empty-star" data-rating="3"><img src="./images/star_empty.png" class="star" /></span>
        <span class="empty-star" data-rating="4"><img src="./images/star_empty.png" class="star" /></span>
        <span class="empty-star" data-rating="5"><img src="./images/star_empty.png" class="star" /></span>
      </div>
      <div class="detail-rating">
        <span class="rating-text">이 작품 어땠나요?</span>
        <span class="rating-score">(?/10)</span>
      </div>
    `;

    this.setupStarRating(container);
    return container;
  }

    setupStarRating(modalElement) {
    const stars = modalElement.querySelectorAll('.empty-star');
    const ratingText = modalElement.querySelector('.rating-text');
    const ratingScore = modalElement.querySelector('.rating-score');

    const ratingTexts = {
      1: '최악이에요',
      2: '별로예요',
      3: '보통이에요',
      4: '재미있어요',
      5: '명작이에요',
    };

    const ratingScores = {
      1: '(2/10)',
      2: '(4/10)',
      3: '(6/10)',
      4: '(8/10)',
      5: '(10/10)',
    };

    if (this.userRating > 0) {
      stars.forEach((s, index) => {
        if (index < this.userRating) {
          s.innerHTML = '<img src="./images/star_filled.png" class="star" />';
          s.classList.remove('empty-star');
          s.classList.add('filled-star');
        }
      });
      ratingText.textContent = ratingTexts[this.userRating];
      ratingScore.textContent = ratingScores[this.userRating];
    }

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        this.userRating = rating;
        this.ratingStorage.saveRating(this.movie.id, rating);

        stars.forEach((s, index) => {
          if (index < rating) {
            s.innerHTML = '<img src="./images/star_filled.png" class="star" />';
            s.classList.remove('empty-star');
            s.classList.add('filled-star');
          } else {
            s.innerHTML = '<img src="./images/star_empty.png" class="star" />';
            s.classList.remove('filled-star');
            s.classList.add('empty-star');
          }
        });

        
        ratingText.textContent = ratingTexts[rating];
        ratingScore.textContent = ratingScores[rating];
      });
    });
  }
}

export default StarRating;