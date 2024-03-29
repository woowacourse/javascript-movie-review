import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no_image.png';
import { Movie, MovieDetail } from './../../types/movie';
import '../MovieItem/MovieItem.css';
import { POSTER_BASE_URL } from '../../consts/URL';
import movieAPI from '../../api/movie';
import MovieDomain from '../../domain/entity/Movie';
import { setUrlParams } from '../../utils/queryString';

type MovieItemProps = {
  movie: Movie;
  rerenderModal: (id: number) => void;
};

class MovieItem {
  movie;
  itemBox;
  itemCard;
  rerenderModal: (id: number) => void;

  constructor({ movie, rerenderModal }: MovieItemProps) {
    this.movie = movie;
    this.itemBox = document.createElement('li');
    this.itemBox.setAttribute('data-movie-id', String(movie.id));

    this.itemCard = document.createElement('a');
    this.itemCard.classList.add('item-card');

    this.rerenderModal = rerenderModal;
    this.setEvent();
  }

  setEvent() {
    this.itemCard.addEventListener('click', async () => {
      setUrlParams('movie_id', String(this.movie.id));
      const movieDetailModal = document.querySelector('.modal');
      movieDetailModal?.classList.add('modal-open');
      this.rerenderModal(this.movie.id);
    });
  }

  template() {
    const { title, posterPath, voteAverage } = this.movie;
    this.itemCard.classList.add('item-card');

    const titleBox = this.createTitle(title);
    const voteAverageBox = this.createScore(voteAverage);

    if (posterPath) {
      const posterImage = this.createPoster(title, posterPath);
      this.itemCard.append(posterImage);
    } else {
      const noImage = this.createNoImage();
      this.itemCard.append(noImage);
    }

    this.itemCard.append(titleBox);
    this.itemCard.append(voteAverageBox);
    this.itemBox.append(this.itemCard);

    return this.itemBox;
  }

  createPoster(title: string, posterPath: string) {
    const posterImage = document.createElement('img');
    posterImage.setAttribute('loading', 'lazy');
    posterImage.classList.add('item-thumbnail');

    if (posterPath) {
      posterImage.setAttribute('src', POSTER_BASE_URL + posterPath);
    }
    posterImage.setAttribute('alt', title);

    return posterImage;
  }

  createNoImage() {
    const noImage = document.createElement('div');
    noImage.classList.add('no-image', 'item-thumbnail');
    const noImageIcon = document.createElement('img');
    noImageIcon.classList.add('no-image-icon');
    noImageIcon.setAttribute('src', NoImage);
    noImage.append(noImageIcon);
    return noImage;
  }

  createTitle(title: string) {
    const titleBox = document.createElement('p');
    titleBox.classList.add('item-title', 'multi-lines-overflow');
    titleBox.textContent = title;
    return titleBox;
  }

  createScore(voteAverage: number) {
    const voteAverageBox = document.createElement('p');
    voteAverageBox.classList.add('item-score');

    const starImage = document.createElement('img');
    starImage.setAttribute('src', Star);
    starImage.setAttribute('alt', '별점');

    const voteAverageText = document.createElement('span');
    voteAverageText.textContent = String(voteAverage);

    voteAverageBox.append(starImage);
    voteAverageBox.append(voteAverageText);

    return voteAverageBox;
  }
}

export default MovieItem;
