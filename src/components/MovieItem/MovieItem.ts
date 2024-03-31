import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no-image.png';
import { POSTER_BASE_URL } from '../../consts/Api';
import { Movie } from './../../types/movie';
import '../MovieItem/MovieItem.css';
import { MovieDetailAPI } from '../../domain/services/API.type';
import MovieDetailFetcher from '../../domain/services/MovieDetailFetcher';

class MovieItem {
  constructor() {}

  template(movie: Movie, onClick: (movieData: MovieDetailAPI) => void) {
    const { id, title, posterPath, voteAverage } = movie;
    const itemBox = document.createElement('li');
    itemBox.setAttribute('data-movie-id', String(id));

    const itemCard = document.createElement('a');
    itemCard.classList.add('item-card');

    const itemImage = document.createElement('img');
    itemImage.classList.add('item-thumbnail', 'skeleton');
    itemCard.append(itemImage);

    const image = new Image();
    image.src = posterPath ? POSTER_BASE_URL + posterPath : NoImage;

    image.onload = () => {
      itemImage.setAttribute('src', image.src);
      itemImage.setAttribute('alt', title);
      itemImage.classList.remove('skeleton');
    };

    const itemTitle = document.createElement('p');
    itemTitle.classList.add('item-title', 'skeleton');

    const itemScoreAndIcon = document.createElement('div');
    itemScoreAndIcon.classList.add('item-score-and-icon');

    const itemStarIcon = document.createElement('img');
    itemStarIcon.classList.add('item-star-icon');

    const itemScore = document.createElement('p');
    itemScore.classList.add('item-score', 'skeleton');

    itemScoreAndIcon.append(itemStarIcon);
    itemScoreAndIcon.append(itemScore);

    const starImage = new Image();
    starImage.src = Star;

    starImage.onload = () => {
      itemTitle.textContent = title;
      itemScore.textContent = String(voteAverage);
      itemStarIcon.setAttribute('src', starImage.src);
      itemStarIcon.setAttribute('alt', '별점');

      itemTitle.classList.remove('skeleton');
      itemScore.classList.remove('skeleton');
    };

    itemCard.append(itemTitle);
    itemCard.append(itemScoreAndIcon);

    itemBox.append(itemCard);

    itemBox.addEventListener('click', async () => {
      onClick(await MovieDetailFetcher.fetchMovieDetail(id));
    });

    return itemBox;
  }
}

export default MovieItem;
