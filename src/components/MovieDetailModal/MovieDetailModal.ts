import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { POSTER_BASE_URL } from '../../api';
import { STAR_MESSAGE } from '../../constants/messages';
import { RULES } from '../../constants/rule';
import { MovieDetail } from '../../domain/Movies';
import { STAR_EMPTY, STAR_FILLED } from '../../resource';
import { $ } from '../../utils/dom';
import MovieDetailController from '../../controller/MovieDetailController';
import MovieDetailSkeleton from '../SkeletonItem/MovieDetailSkeleton';

const starImage = (src: string, index: number) => {
  const starImage = document.createElement('img');

  starImage.classList.add('star');
  starImage.dataset['starIndex'] = String(index);
  starImage.src = src;

  return starImage;
};

class MovieDetailModal extends ModalWrapper {
  #container = document.createElement('div');
  #title = document.createElement('div');
  #content = document.createElement('div');
  #movieDetailController;

  constructor() {
    super();
    this.#movieDetailController = new MovieDetailController(localStorage);
    this.#container.classList.add('movie-detail-container');
    this.#title.classList.add('movie-detail-title-container');
    this.#content.classList.add('movie-detail-content');
  }

  async replace(id: number) {
    this.#setSkeleton();
    const movieDetailData = await this.#movieDetailController.getMovieDetail(id);
    const element = this.#initDataElement(movieDetailData);

    this.replaceContent(element);
  }

  #setSkeleton() {
    this.replaceContent(
      MovieDetailSkeleton({
        onCloseButtonClick: () => this.toggle(),
      }),
    );
    this.toggle();
  }

  #initDataElement(data: MovieDetail) {
    this.#initTitle(data);
    this.#initPoster(data);
    this.#initMovieDetailDescription(data);

    this.#container.appendChild(this.#title);
    this.#container.appendChild(this.#content);

    return this.#container;
  }

  #initTitle(data: MovieDetail) {
    const h2 = document.createElement('h2');
    const closeButton = document.createElement('button');

    h2.classList.add('movie-detail-title');
    closeButton.classList.add('movie-detail-close-button');

    h2.textContent = data.title;
    closeButton.innerHTML = /* html */ `
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7665 1.54966L12.38 0L6.88315 6.14368L1.38632 0L-0.000183105 1.54966L5.49665 7.69333L-0.000183105 13.837L1.38632 15.3867L6.88315 9.24299L12.38 15.3867L13.7665 13.837L8.26965 7.69333L13.7665 1.54966Z" fill="#F1F1F1"/>
    </svg>
  `;

    closeButton.addEventListener('click', this.toggle.bind(this));

    this.#title.replaceChildren(h2);
    this.#title.appendChild(closeButton);
  }

  #initPoster(data: MovieDetail) {
    const movieDetailPoster = document.createElement('div');

    movieDetailPoster.classList.add('movie-detail-poster');
    movieDetailPoster.innerHTML = `<img src="${POSTER_BASE_URL}${data.poster_path}" />`;

    this.#content.replaceChildren(movieDetailPoster);
  }

  #initMovieDetailDescription(data: MovieDetail) {
    const movieDetailDescription = document.createElement('div');

    movieDetailDescription.classList.add('movie-detail-description');
    movieDetailDescription.insertAdjacentHTML(
      'afterbegin',
      `
    <div class="movie-detail-text-content">
      <div class="genre-info">
        <span>${data.genres.join(RULES.genreSeparator)}</span>
        <span class="movie-detail-vote-average">
          <img src="${STAR_FILLED}" />
          ${data.vote_average.toFixed(RULES.averageDecimalPlaces)}
        </span>
      </div>
      <p class="overview">${data.overview === '' ? '-' : data.overview}</p>
    </div>
  `,
    );

    const reviewContainer = this.#getReviewContainerTemplate(data);

    movieDetailDescription.appendChild(reviewContainer);
    this.#content.appendChild(movieDetailDescription);
  }

  #getReviewContainerTemplate(data: MovieDetail) {
    const filledStarLength = data.my_grade / 2;
    const reviewContainer = document.createElement('div');
    const myStars = document.createElement('span');
    const stars = document.createElement('div');

    reviewContainer.classList.add('review-container');
    myStars.classList.add('my-stars');
    stars.classList.add('stars');

    myStars.textContent = '내 별점';

    Array.from({ length: 5 }).forEach((_, index) => {
      if (index < filledStarLength) {
        stars.appendChild(starImage(STAR_FILLED, index));
      } else {
        stars.appendChild(starImage(STAR_EMPTY, index));
      }
    });

    const reviewRateContainer = document.createElement('div');
    const reviewRating = document.createElement('span');
    const reviewText = document.createElement('span');

    reviewRateContainer.classList.add('review-rate-container');
    reviewRating.classList.add('review-rating', 'my-stars');
    reviewText.classList.add('review-text', 'my-stars');

    reviewRating.textContent = String(data.my_grade);
    reviewText.textContent = STAR_MESSAGE[data.my_grade];

    reviewRateContainer.appendChild(reviewRating);
    reviewRateContainer.appendChild(reviewText);

    reviewContainer.appendChild(myStars);
    reviewContainer.appendChild(stars);
    reviewContainer.appendChild(reviewRateContainer);

    stars.addEventListener('click', (event) => this.#onStarClick(data.id, event));
    stars.addEventListener('mouseout', (event) => this.#onStarMouseout(data.id, event));
    stars.addEventListener('mouseover', this.#onStarMouseover.bind(this));

    return reviewContainer;
  }

  #onStarClick(id: number, event: MouseEvent) {
    const target = event.target as HTMLElement;
    const targetStar = target.closest('.star') as HTMLImageElement;
    if (!targetStar) return;
    const starIndex = Number(targetStar.dataset?.starIndex);
    const grade = starIndex * 2 + 2;

    this.#movieDetailController.updateMovieDetail(id, grade);
  }

  #onStarMouseout(id: number, event: MouseEvent) {
    const target = event.target as HTMLElement;
    const stars = target.closest('.stars') as HTMLDivElement;
    const reviewRating = $('.review-rating') as HTMLSpanElement;
    const reviewText = $('.review-text') as HTMLSpanElement;
    const movieDetails = this.#movieDetailController.MovieDetails;
    const movieGrade = movieDetails[id].my_grade;

    Array.from({ length: stars.children.length }).forEach((_, index) => {
      const star = stars.children[index] as HTMLImageElement;

      if (index < movieGrade / 2) {
        star.src = STAR_FILLED;
      } else {
        star.src = STAR_EMPTY;
      }
    });

    reviewRating.textContent = String(movieGrade);
    reviewText.textContent = STAR_MESSAGE[movieGrade];
  }

  #onStarMouseover(event: MouseEvent) {
    const stars = document.querySelectorAll('.star') as NodeListOf<HTMLImageElement>;
    const target = event.target as HTMLElement;
    const targetStar = target.closest('.star') as HTMLImageElement;
    if (!targetStar) return;
    const gradeElement = $('.review-rating') as HTMLSpanElement;
    const gradeText = $('.review-text') as HTMLSpanElement;
    const starIndex = Number(targetStar.dataset?.starIndex);
    const grade = starIndex * 2 + 2;

    stars.forEach((star, index) => {
      if (index <= starIndex) star.src = STAR_FILLED;
      else star.src = STAR_EMPTY;
    });

    gradeElement.textContent = String(grade);
    gradeText.textContent = STAR_MESSAGE[grade];
  }
}

export default MovieDetailModal;
