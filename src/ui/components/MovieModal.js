import StarRating from './StarRating.js';

export default class MovieModal {
  constructor(movie, movieService) {
    this.movie = movie;
    this.movieService = movieService;
    this.modalRoot = document.querySelector("#modalBackground");
  }

  render() {
    const modal = this.createModalContent();
    this.modalRoot.textContent = '';
    this.modalRoot.appendChild(modal);
    this.modalRoot.classList.add('active');
    document.body.classList.add('modal-open');
    this.addEventListeners();
  }

  close() {
    this.modalRoot.classList.remove('active');
    document.body.classList.remove('modal-open');
    this.modalRoot.textContent = '';
    document.removeEventListener('keydown', this.handleEsc);
  }

  createModalContent() {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const closeButton = this.createModalCloseButton();
    const container = this.createModalContainer();

    modal.append(closeButton, container);
    return modal;
  }

  createModalCloseButton() {
    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.id = 'closeModal';

    const closeImg = document.createElement('img');
    closeImg.src = 'images/modal_button_close.png';
    closeButton.appendChild(closeImg);

    return closeButton;
  }

  createModalContainer() {
    const container = document.createElement('div');
    container.className = 'modal-container';

    const imageWrapper = this.createPosterImage();
    const description = this.createDescriptionContent();

    container.append(imageWrapper, description);
    return container;
  }

  createPosterImage() {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'modal-image';

    const poster = document.createElement('img');
    poster.src = this.movie.getPosterUrl();
    poster.alt = this.movie.title;

    imageWrapper.appendChild(poster);
    return imageWrapper;
  }

  createDescriptionContent() {
    const description = document.createElement("div");
    description.className = "modal-description";

    const movieBasicInfo = this.createMovieBasicInfo();
    const ratingBox = this.createRatingBox();
    const detailBox = this.createDetailBox();

    const hr1 = document.createElement("hr");
    const hr2 = document.createElement("hr");

    description.append(movieBasicInfo, hr1, ...ratingBox, hr2, ...detailBox);
    return description;
  }

  createMovieBasicInfo() {
    const movieBasicInfo = document.createElement("div");
    movieBasicInfo.className = "movie-basic-info";

    const title = document.createElement("h2");
    title.textContent = this.movie.title;

    const category = document.createElement("p");
    category.className = "category";
    category.textContent = "불러오는 중...";
    this.getMovieDetailText().then((text) => {
      category.textContent = text;
    });

    const rateBox = document.createElement("div");
    rateBox.className = "rate-box";

    const rate = document.createElement("p");
    rate.className = "rate";

    const starImg = document.createElement("img");
    starImg.src = "./images/star_filled.png";
    starImg.className = "star";

    const rateText = document.createElement("span");
    rateText.textContent = this.movie.getVoteAverage();

    rate.append(starImg, rateText);

    const rateTitle = document.createElement("p");
    rateTitle.textContent = "평균";

    rateBox.append(rateTitle, rate);
    movieBasicInfo.append(title, category, rateBox);

    return movieBasicInfo;
  }

  createRatingBox() {
    const myRatingTitle = document.createElement("p");
    myRatingTitle.textContent = "내 별점";
    myRatingTitle.className = "user-rating-title";

    const ratingBox = document.createElement("div");
    ratingBox.className = "rating-box";

    const ratingMessage = document.createElement("p");
    ratingMessage.className = "rating-message";

    const starRating = new StarRating(this.movie.id, (score) => {
      ratingMessage.textContent = this.getMessageByScore(score);
    });

    const starUI = starRating.render();

    const rating = starRating.getRating();
    if (rating > 0) {
      ratingMessage.textContent = this.getMessageByScore(rating);
    }

    ratingBox.append(starUI, ratingMessage);

    return [myRatingTitle, ratingBox];
  }

  createDetailBox() {
    const detailTitle = document.createElement("p");
    detailTitle.textContent = "줄거리";

    const detail = document.createElement("p");
    detail.className = "detail";
    detail.textContent = this.movie.overview || "설명 정보 없음";

    return [detailTitle, detail];
  }

  addEventListeners() {
    const closeButton = document.querySelector('#closeModal');
    const overlay = this.modalRoot;

    closeButton?.addEventListener('click', this.close.bind(this))
    overlay?.addEventListener('click', this.closeModalByOverlay.bind(this));
    document.addEventListener('keydown', this.handleEsc)
  }

  closeModalByOverlay(e) {
    if (e.target === this.modalRoot) {
      this.close();
    }
  }

  handleEsc = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  getMessageByScore(score) {
    const messages = {
      1: "최악이에요",
      2: "별로예요",
      3: "보통이에요",
      4: "재미있어요",
      5: "명작이에요",
    };
    const point = score * 2;
    const message = messages[score] ?? "";
    return `${message} (${point}/10)`;
  }

  async getMovieDetailText() {
    try {
      const { genres, releaseDate } = await this.movieService.getMovieDetail(this.movie.id);
      const releaseYear = releaseDate.split('-')[0];
      const genreText = genres.map((g) => g.name).join(", ") || "장르 정보 없음";
      return `${releaseYear} · ${genreText}`;
    } catch (error) {
      console.error("영화 장르 로딩에 실패", error);
      alert("영화 장르 로딩에 실패하였습니다.");
    }
  }
}
