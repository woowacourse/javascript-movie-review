import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no-image.png';
import { POSTER_BASE_URL } from '../../consts/Api';
import { Movie } from './../../types/movie';
import '../MovieItem/MovieItem.css';
import { MovieDetailAPI } from '../../domain/services/API.type';
import MovieDetailFetcher from '../../domain/services/MovieDetailFetcher';
import Skeleton from '../Skeleton/Skeleton';

class MovieItem {
  itemBox = document.createElement('li');

  constructor() {
    this.itemBox.append(Skeleton.template());
  }

  get item() {
    return this.itemBox;
  }

  render(movie: Movie, onClick: (movieData: MovieDetailAPI) => void) {
    const { id, title, posterPath, voteAverage } = movie;

    const itemImage = this.itemBox.querySelector('.item-thumbnail');
    if (!itemImage) return;

    const image = new Image();
    image.src = posterPath ? POSTER_BASE_URL + posterPath : NoImage;

    image.onload = () => {
      itemImage.setAttribute('src', image.src);
      itemImage.setAttribute('alt', title);
      itemImage.classList.remove('skeleton');
    };

    const itemTitle = this.itemBox.querySelector('.item-title');
    if (!itemTitle) return;

    const itemScoreAndIcon = this.itemBox.querySelector('.item-score-and-icon');
    if (!itemScoreAndIcon) return;

    const itemScore = this.itemBox.querySelector('.item-score');
    if (!itemScore) return;

    const itemStarIcon = this.itemBox.querySelector('.item-star-icon');
    if (!itemStarIcon) return;

    const starImage = new Image();
    starImage.src = Star;

    starImage.onload = () => {
      itemTitle.textContent = title;
      itemScore.textContent = String(voteAverage);
      itemStarIcon.setAttribute('src', starImage.src);
      itemStarIcon.setAttribute('alt', '별점');

      itemTitle.classList.remove('skeleton');
      itemScoreAndIcon.classList.remove('skeleton');
    };

    this.itemBox.addEventListener('click', async () => {
      onClick(await MovieDetailFetcher.fetchMovieDetail(id));
    });
  }
}

export default MovieItem;
