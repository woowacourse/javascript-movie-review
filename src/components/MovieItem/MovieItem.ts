import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no_image.png';
import { Movie } from './../../types/movie';
import '../MovieItem/MovieItem.css';
import { POSTER_BASE_URL } from '../../consts/URL';
import { setUrlParams } from '../../utils/queryString';

type MovieItemProps = {
  movie: Movie;
  rerenderModal: (id: number) => void;
};

class MovieItem {
  movie: Movie;
  itemBox = document.createElement('li');
  itemCard = document.createElement('a');
  itemThumbnail = document.createElement('img');
  itemTitle = document.createElement('div');
  itemScore = document.createElement('p');

  rerenderModal: (id: number) => void;

  constructor({ movie, rerenderModal }: MovieItemProps) {
    this.movie = movie;
    this.itemBox.setAttribute('data-movie-id', String(movie.id));
    this.itemCard.classList.add('item-card');

    this.renderSkeleton();

    this.rerenderModal = rerenderModal;
    this.setEvent();
  }

  renderSkeleton() {
    this.itemThumbnail.classList.add('item-thumbnail', 'skeleton');
    this.itemTitle.classList.add('item-title', 'skeleton');
    this.itemScore.classList.add('item-score', 'skeleton');

    this.itemCard.append(this.itemThumbnail);
    this.itemCard.append(this.itemTitle);
    this.itemCard.append(this.itemScore);
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
    this.createThumbnail(title, posterPath);
    this.createTitle(title);
    this.createScore(voteAverage);

    this.itemBox.append(this.itemCard);

    return this.itemBox;
  }

  createThumbnail(title: string, posterPath: string | null) {
    if (posterPath) {
      this.itemThumbnail.setAttribute('loading', 'lazy');
      this.itemThumbnail.classList.add('item-thumbnail');
      this.itemThumbnail.setAttribute('src', POSTER_BASE_URL + posterPath);
      this.itemThumbnail.setAttribute('alt', title);
    } else {
      const noImage = this.createNoImage();
      this.itemCard.append(noImage);
    }
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
    this.itemTitle.classList.remove('skeleton');
    this.itemTitle.classList.add('multi-lines-overflow');
    this.itemTitle.textContent = title;
  }

  createScore(voteAverage: number) {
    this.itemScore.classList.remove('skeleton');
    const starImage = document.createElement('img');
    starImage.setAttribute('src', Star);
    starImage.setAttribute('alt', '별점');

    const voteAverageText = document.createElement('span');
    voteAverageText.textContent = String(voteAverage);

    this.itemScore.append(starImage);
    this.itemScore.append(voteAverageText);
  }
}

export default MovieItem;
