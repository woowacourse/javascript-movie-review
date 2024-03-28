import { BUTTON } from '../../constants/INFORMATION';
import { fetchMovieDetail } from '../../domain/Request/sendRequest';
import { IMovieDetail } from '../../interfaces/IMovieDetail';
import { starEmpty, starFilled } from '../../resources';
import { getAllDomElements, getDomElement } from '../../util/DOM';
import Button from '../Button/Button';

class MovieInfoModal {
  #movieID: number;
  #localVote: number;

  constructor(movieID: number) {
    this.#movieID = movieID;
    this.#localVote = localStorage.getItem(`${this.#movieID}`) ? Number(localStorage.getItem(`${this.#movieID}`)) : 6;
    this.create();
    this.setHandle();
    console.log(123);
  }

  create() {
    const movieDetailModal = document.createElement('div');
    movieDetailModal.id = 'movie-detail-modal';
    const movieDetailModalHeader = this.#createHeader();
    const movieDetailModalContent = this.#createContent();

    movieDetailModal.appendChild(movieDetailModalHeader);
    movieDetailModal.appendChild(movieDetailModalContent);

    this.mountItems();

    getDomElement('#app').appendChild(movieDetailModal);
  }

  async mountItems(): Promise<void> {
    const movieDetailData: IMovieDetail = await this.getMovieDetailData(this.#movieID);
    console.log(movieDetailData);
    this.replaceAllSkeletons(movieDetailData);
  }

  setHandle() {
    getDomElement('.close-button').addEventListener('click', () => {
      getDomElement('#movie-detail-modal').remove;
    });
  }

  #createHeader() {
    const header = document.createElement('div');

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
    const description = this.#createDescription();
    const vote = this.#createVote();

    descriptionAndVote.appendChild(description);
    descriptionAndVote.appendChild(vote);

    return descriptionAndVote;
  }

  #createDescription() {
    const description = document.createElement('div');
    const genreAndVoteAverage = this.#createGenreAndVoteAverage();
    const overView = this.#createOverView();

    description.appendChild(genreAndVoteAverage);
    description.appendChild(overView);

    return description;
  }

  #createGenreAndVoteAverage(): HTMLElement {
    const genreAndVoteAverage = document.createElement('div');
    const genre = document.createElement('p');
    genre.classList.add('skeleton');
    const voteAverage = document.createElement('p');
    voteAverage.classList.add('item-vote-average', 'skeleton');

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
    vote.classList.add('item-vote', 'skeleton');
    const myVoteMessage = document.createElement('p');
    myVoteMessage.textContent = '내 별점';
    const star = this.#createAllVoteStars();
    const myVote = document.createElement('p');
    myVote.textContent = this.#localVote.toString();
    const myVoteDescription = document.createElement('p');
    myVoteDescription.textContent = this.#getMyVoteDescription();

    vote.appendChild(myVoteMessage);
    vote.appendChild(star);
    vote.appendChild(myVote);
    vote.appendChild(myVoteDescription);

    return vote;
  }

  #createAllVoteStars() {
    const voteStars = document.createElement('div');
    [...Array(5)].forEach((_, index) => {
      voteStars.appendChild(this.#createVoteStar(index));
    });
    return voteStars;
  }

  #createVoteStar(index: number) {
    const star = Button.create(BUTTON.voteStar) as HTMLButtonElement;
    const starImage = document.createElement('img');
    starImage.src = index * 2 <= this.#localVote ? starFilled : starEmpty;
    star.appendChild(starImage);
    return star;
  }

  #getMyVoteDescription() {
    switch (this.#localVote) {
      case 0 | 2:
        return '별로에요';
      case 4 | 6:
        return '보통이에요';
      case 8 | 10:
        return '재밌어요';
      default:
        return null;
    }
  }

  async getMovieDetailData(movie_id: number) {
    return await fetchMovieDetail(movie_id);
  }

  replaceAllSkeletons(movieDetailData: IMovieDetail) {
    const movieDetailModal = getDomElement('#movie-detail-modal');
    getAllDomElements('.skeleton', movieDetailModal).forEach((element: HTMLElement) => {
      if (element.classList.contains('modal-header-title')) {
        element.textContent = movieDetailData.title;
        element.classList.toggle('skeleton');
      }
      if (element.classList.contains('item-poster')) {
        (element as HTMLImageElement).src = movieDetailData.poster_path;
        element.onload = () => element.classList.toggle('skeleton');
      }
      if (element.classList.contains('genre')) {
        element.innerText = movieDetailData.genres.join();
        element.classList.toggle('skeleton');
      }
      if (element.classList.contains('item-vote-average')) {
        element.innerText = `${movieDetailData.vote_average}`;
        element.classList.toggle('skeleton');
      }
      if (element.classList.contains('item-overview')) {
        element.innerText = movieDetailData.overview;
        element.classList.toggle('skeleton');
      }
      if (element.classList.contains('item-vote')) {
        element.classList.toggle('skeleton');
      }
    });
  }
}

export default MovieInfoModal;
