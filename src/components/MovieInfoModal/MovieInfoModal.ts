import { BUTTON, LOCAL_VOTE } from '../../constants/INFORMATION';
import { MOVIE_POSTER_URL } from '../../constants/URLs';
import { fetchMovieDetail } from '../../domain/Request/sendRequest';
import { IMovieDetail } from '../../interfaces/IMovieDetail';
import { starEmpty, starFilled } from '../../resources';
import { getAllDomElements, getDomElement } from '../../util/DOM';
import EscapeModal from '../../util/EscapeModal';
import Button from '../Button/Button';
import MovieItems from '../MovieItems/MovieItems';

class MovieInfoModal {
  #movieID: number;
  #localVote: number;

  constructor(movieID: number) {
    this.#movieID = movieID;
    this.#localVote = Number(localStorage.getItem(`${this.#movieID}`)) ?? 0;
    this.create();
    this.setHandle();

    document.addEventListener('keydown', this.handleKeyPress);
    document.body.style.overflow = 'hidden';
  }

  create() {
    const movieDetailModal = document.createElement('div');
    movieDetailModal.id = 'movie-detail-modal__open';

    const modalBackdrop = document.createElement('div');

    const movieDetailModalContainer = document.createElement('div');
    movieDetailModalContainer.classList.add('modal-container');

    const movieDetailModalHeader = this.#createHeader();
    const movieDetailModalContent = this.#createContent();

    movieDetailModalContainer.appendChild(movieDetailModalHeader);
    movieDetailModalContainer.appendChild(movieDetailModalContent);

    movieDetailModal.appendChild(movieDetailModalContainer);
    movieDetailModal.appendChild(modalBackdrop);

    this.mountItems();

    getDomElement('#app').appendChild(movieDetailModal);
  }

  async mountItems(): Promise<void> {
    const movieDetailData: IMovieDetail = await this.getMovieDetailData(this.#movieID);
    this.replaceAllSkeletons(movieDetailData);
  }

  setHandle() {
    getDomElement('.close-button').addEventListener('click', () => {
      const modal = getDomElement('#movie-detail-modal__open');
      EscapeModal(modal, this.handleKeyPress);
    });

    // getDomElement();
  }

  handleKeyPress = (event: KeyboardEvent) => {
    const modal = getDomElement('#movie-detail-modal__open');
    EscapeModal(modal, this.handleKeyPress, event, 'Escape');
  };

  #createHeader() {
    const header = document.createElement('div');
    header.classList.add('modal-header');
    const title = document.createElement('h2');
    title.classList.add('modal-header-title', 'skeleton');

    header.appendChild(title);
    header.appendChild(Button.create(BUTTON.closeModal));
    return header;
  }

  #createContent() {
    const content = document.createElement('div');
    content.classList.add('modal-content');
    const poster = this.#createPoster();
    const descriptionAndVote = this.#createDescriptionAndVote();

    content.appendChild(poster);
    content.appendChild(descriptionAndVote);

    return content;
  }

  #createPoster() {
    const poster = document.createElement('img');
    poster.classList.add('item-poster', 'skeleton');
    return poster;
  }

  #createDescriptionAndVote() {
    const descriptionAndVote = document.createElement('div');
    descriptionAndVote.classList.add('modal-description-and-vote');
    const description = this.#createDescription();
    const vote = this.#createVote();

    descriptionAndVote.appendChild(description);
    descriptionAndVote.appendChild(vote);

    return descriptionAndVote;
  }

  #createDescription() {
    const description = document.createElement('div');
    description.classList.add('item-description');
    const genreAndVoteAverage = this.#createGenreAndVoteAverage();
    const overView = this.#createOverView();

    description.appendChild(genreAndVoteAverage);
    description.appendChild(overView);

    return description;
  }

  #createGenreAndVoteAverage(): HTMLElement {
    const genreAndVoteAverage = document.createElement('div');
    genreAndVoteAverage.classList.add('modal-genre-and-vote');
    const genre = document.createElement('p');
    genre.classList.add('item-genre', 'skeleton');
    genre.textContent = 'ㅤㅤㅤㅤㅤㅤㅤㅤ';
    const voteAverage = document.createElement('p');
    voteAverage.classList.add('item-vote-average', 'skeleton');
    voteAverage.textContent = 'ㅤㅤㅤ';

    genreAndVoteAverage.appendChild(genre);
    genreAndVoteAverage.appendChild(voteAverage);

    return genreAndVoteAverage;
  }

  #createOverView() {
    const overView = document.createElement('p');
    overView.classList.add('item-overview', 'skeleton');
    return overView;
  }

  #createVote() {
    const vote = document.createElement('div');
    vote.classList.add('item-vote');

    const myVoteMessage = document.createElement('p');
    myVoteMessage.textContent = '내 별점';

    const star = this.#createAllVoteStars();

    const myVote = document.createElement('p');
    myVote.classList.add('modal-my-vote');
    myVote.textContent = this.#localVote === 0 ? '' : this.#localVote.toString();

    const myVoteDescription = document.createElement('p');
    myVoteDescription.classList.add('modal-my-vote-description');
    myVoteDescription.textContent = LOCAL_VOTE[this.#localVote as keyof typeof LOCAL_VOTE];

    vote.appendChild(myVoteMessage);
    vote.appendChild(star);
    vote.appendChild(myVote);
    vote.appendChild(myVoteDescription);

    return vote;
  }

  #createAllVoteStars() {
    const voteStars = document.createElement('div');
    voteStars.classList.add('modal-vote-stars');
    [...Array(5)].forEach((_, index) => {
      voteStars.appendChild(this.#createVoteStar(index));
    });
    return voteStars;
  }

  #createVoteStar(index: number) {
    const star = document.createElement('img');
    star.classList.add('item-votestar');
    star.src = index * 2 + 2 <= this.#localVote ? starFilled : starEmpty;
    star.addEventListener('click', () => {
      this.#localVote = index * 2 + 2;
      getDomElement('.modal-my-vote').innerText = this.#localVote === 0 ? '' : (index * 2 + 2).toString();
      getDomElement('.modal-my-vote-description').innerText = LOCAL_VOTE[this.#localVote as keyof typeof LOCAL_VOTE];
      this.#drawStars(index);
      this.#saveLocalVoteData();
    });
    return star;
  }

  async getMovieDetailData(movie_id: number) {
    return await fetchMovieDetail(movie_id);
  }

  replaceAllSkeletons(movieDetailData: IMovieDetail) {
    const movieDetailModal = getDomElement('#movie-detail-modal__open');
    getAllDomElements('.skeleton', movieDetailModal).forEach((element: HTMLElement) => {
      if (element.classList.contains('modal-header-title')) {
        element.textContent = movieDetailData.title;
        element.classList.toggle('skeleton');
      }
      if (element.classList.contains('item-poster')) {
        (element as HTMLImageElement).src = `${MOVIE_POSTER_URL}${movieDetailData.poster_path}`;
        element.onload = () => element.classList.toggle('skeleton');
      }
      if (element.classList.contains('item-genre')) {
        element.innerText = movieDetailData.genres.map((genre) => genre.name).join(', ');
        element.classList.toggle('skeleton');
      }
      if (element.classList.contains('item-vote-average')) {
        element.textContent = ` ${movieDetailData.vote_average.toFixed(1)}`;
        const starImage = MovieItems.createStarElement();
        element.prepend(starImage);
        element.classList.toggle('skeleton');
      }
      if (element.classList.contains('item-overview')) {
        element.innerText =
          movieDetailData.overview === ' ' ? movieDetailData.overview : '영화 설명 정보가 존재하지 않습니다.';
        element.classList.toggle('skeleton');
      }
    });
  }

  #drawStars(starIndex: number) {
    const stars = getAllDomElements<HTMLImageElement>('.item-votestar');
    stars.forEach((star, index) => {
      if (index * 2 < this.#localVote) {
        star.src = starFilled;
      } else {
        star.src = starEmpty;
      }
    });
  }

  #saveLocalVoteData() {
    localStorage.setItem(this.#movieID.toString(), this.#localVote.toString());
  }
}

export default MovieInfoModal;
