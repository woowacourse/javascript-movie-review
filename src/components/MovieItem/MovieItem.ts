import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no_image.png';
import type { Movie } from '../../domain/entity/movie.type';
import '../MovieItem/MovieItem.css';
import { POSTER_BASE_URL } from '../../consts/URL';
import { getEndpoint, setUrlParams } from '../../utils/queryString';

type MovieItemProps = {
  skeletonTemplate: HTMLElement;
  movie: Movie;
  rerenderModal: (id: number) => void;
};

class MovieItem {
  movie: Movie;
  itemCard;
  itemThumbnail;
  itemTitle;
  itemScore;

  rerenderModal: (id: number) => void;

  constructor({ skeletonTemplate, movie, rerenderModal }: MovieItemProps) {
    this.movie = movie;
    this.itemCard = skeletonTemplate.querySelector('a')!;
    this.itemThumbnail = skeletonTemplate.querySelector('img')!;
    this.itemTitle = skeletonTemplate.querySelector('div')!;
    this.itemScore = skeletonTemplate.querySelector('p')!;

    this.rerenderModal = rerenderModal;
    this.setEvent();
  }

  render() {
    const { title, posterPath, voteAverage } = this.movie;
    this.createThumbnail(title, posterPath);
    this.createTitle(title);
    this.createScore(voteAverage);
  }

  setEvent() {
    this.itemCard.addEventListener('click', async () => {
      const topScrollButton = document.querySelector('#top-scroll-button');
      topScrollButton?.classList.remove('show');

      const endpoint = getEndpoint() || '';
      setUrlParams('movie_id', endpoint, String(this.movie.id));
      const movieDetailModal = document.querySelector('.modal');
      movieDetailModal?.classList.add('modal-open');
      this.rerenderModal(this.movie.id);
    });
  }

  createThumbnail(title: string, posterPath: string | null) {
    if (posterPath) {
      this.itemThumbnail.setAttribute('loading', 'lazy');
      this.itemThumbnail.classList.add('item-thumbnail');
      this.itemThumbnail.setAttribute('src', POSTER_BASE_URL + posterPath);
      this.itemThumbnail.setAttribute('alt', title);
    } else {
      const noImageThumbnail = MovieItem.createNoImage();
      this.itemThumbnail.replaceWith(noImageThumbnail);
    }
  }

  static createNoImage() {
    const noImageThumbnail = document.createElement('div');
    noImageThumbnail.classList.add('no-image');
    const noImageIcon = document.createElement('img');
    noImageIcon.classList.add('no-image-icon');
    noImageIcon.setAttribute('src', NoImage);
    noImageThumbnail.append(noImageIcon);
    return noImageThumbnail;
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
