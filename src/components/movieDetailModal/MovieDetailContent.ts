import { Movie } from '../../interface/Movie';
import closeIcon from '../../images/close_icon.png';
import emptyPng from '../../images/empty_poster.png';
import filledStar from '../../images/star_filled.png';
import emptyStar from '../../images/star_empty.png';

class MovieDetailContent {
  #movie;

  constructor(movie: Movie) {
    this.#movie = movie;
  }

  render() {
    const detailContent = document.createElement('div');
    detailContent.className = 'detail-content';

    // 영화 제목 & 닫힘 버튼
    const title = this.createTitle();

    // 서브 정보(썸네일, 장르, 평점, 설명, 내 평점)
    const subDetail = this.createSubDetail();

    detailContent.append(title, subDetail);
    return detailContent;
  }

  createTitle() {
    const title = document.createElement('h3');
    title.className = 'detail-title';
    title.textContent = this.#movie.title;

    const closeButton = this.createCloseButton();

    title.appendChild(closeButton);
    return title;
  }

  createCloseButton() {
    const closeButton = document.createElement('div');
    closeButton.className = 'close-btn';

    const closeImage = document.createElement('img');
    closeImage.src = closeIcon;
    closeImage.alt = '닫힘 버튼';

    closeButton.appendChild(closeImage);
    return closeButton;
  }

  createSubDetail() {
    const subDetail = document.createElement('div');
    subDetail.className = 'sub-detail';

    const thumbnail = this.createThumbnail();
    const description = this.createDescription();

    subDetail.append(thumbnail, description);
    return subDetail;
  }

  createThumbnail() {
    const thumbnail = document.createElement('img');
    thumbnail.className = 'detail-thumbnail';
    thumbnail.src = this.#movie.posterPath ? `https://image.tmdb.org/t/p/w500/${this.#movie.posterPath}.jpg` : emptyPng;
    thumbnail.alt = this.#movie.title;

    return thumbnail;
  }

  createDescription() {
    const description = document.createElement('div');
    description.className = 'detail-description';

    const mainDescription = this.createMainDescription();
    const userVote = this.createUserVote();

    description.append(mainDescription, userVote);
    return description;
  }

  createMainDescription() {
    const mainDescription = document.createElement('div');
    mainDescription.className = 'detail-main-description';

    const firstDescription = this.createFirstDescription();
    const overview = this.createOverview();

    mainDescription.append(firstDescription, overview);
    return mainDescription;
  }

  createFirstDescription() {
    const firstDescription = document.createElement('div');
    firstDescription.className = 'detail-first-description';

    const genres = this.createGenres();
    const vote = this.createVote();

    firstDescription.append(genres, vote);
    return firstDescription;
  }

  createGenres() {
    const genres = document.createElement('p');
    genres.className = 'detail-genres';
    if (this.#movie.genres) {
      const genreNames = this.#movie.genres.map((genre: { id: number; name: string }) => genre.name);
      genres.textContent = genreNames.join(', ');
    }

    return genres;
  }

  createVote() {
    const vote = document.createElement('p');
    vote.className = 'detail-vote';
    vote.textContent = this.#movie.voteAverage;

    const startImage = document.createElement('img');
    startImage.src = filledStar;
    startImage.alt = '별점';

    vote.prepend(startImage);
    return vote;
  }

  createOverview() {
    const overview = document.createElement('p');
    overview.className = 'detail-overview';
    if (this.#movie.overview) {
      overview.textContent = this.#movie.overview;
    }
    return overview;
  }

  createUserVote() {
    const userVoteContainer = document.createElement('div');
    userVoteContainer.className = 'detail-my-vote';
    userVoteContainer.textContent = '내 별점';

    const starsContainer = this.createStarsContainer();
    const voteNumber = this.createVoteNumber();
    const voteText = this.createVoteText();

    userVoteContainer.append(starsContainer, voteNumber, voteText);
    return userVoteContainer;
  }

  createStarsContainer() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'detail-stars';
    starsContainer.innerHTML = `<img src="${emptyStar}" alt="star rating">`.repeat(5);
    return starsContainer;
  }

  createVoteNumber() {
    const voteNumber = document.createElement('div');
    voteNumber.className = 'detail-vote-number';
    return voteNumber;
  }

  createVoteText() {
    const voteText = document.createElement('div');
    voteText.className = 'detail-vote-text';
    return voteText;
  }
}

export default MovieDetailContent;
