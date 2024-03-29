import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no-image.png';
import { POSTER_BASE_URL } from '../../consts/Api';
import { Movie } from './../../types/movie';
import '../MovieItem/MovieItem.css';
import { MovieDetailAPI } from '../../domain/services/API.type';
import MovieDetailFetcher from '../../domain/services/MovieDetailFetcher';

const MovieItem = {
  skeletonTemplate() {
    const skeletonItemBox = document.createElement('li');

    const skeletonCard = document.createElement('a');
    skeletonCard.classList.add('item-card');

    const skeletonThumbnail = document.createElement('div');
    skeletonThumbnail.classList.add('item-thumbnail', 'skeleton');

    const skeletonTitle = document.createElement('div');
    skeletonTitle.classList.add('item-title', 'skeleton');

    const skeletonScore = document.createElement('div');
    skeletonScore.classList.add('item-score', 'skeleton');

    skeletonCard.append(skeletonThumbnail);
    skeletonCard.append(skeletonTitle);
    skeletonCard.append(skeletonScore);

    skeletonItemBox.append(skeletonCard);

    return skeletonItemBox;
  },

  template(movie: Movie, onClick: (movieData: MovieDetailAPI) => void) {
    const { id, title, posterPath, voteAverage } = movie;
    const itemBox = document.createElement('li');
    itemBox.setAttribute('data-movie-id', String(id));

    const itemCard = document.createElement('a');
    itemCard.classList.add('item-card');

    if (posterPath) {
      const itemImage = document.createElement('img');
      itemImage.classList.add('item-thumbnail');
      itemImage.setAttribute('src', POSTER_BASE_URL + posterPath);
      itemImage.setAttribute('loading', 'lazy');
      itemImage.setAttribute('alt', title);
      itemCard.append(itemImage);
    } else {
      const itemImage = this.makeNoImage();
      itemCard.append(itemImage);
    }

    const itemTitle = document.createElement('p');
    itemTitle.classList.add('item-title');
    itemTitle.textContent = title;

    const itemScore = document.createElement('p');
    itemScore.classList.add('item-score');

    const itemStarIcon = document.createElement('img');
    itemStarIcon.setAttribute('src', Star);
    itemStarIcon.setAttribute('alt', '별점');

    itemScore.textContent = String(voteAverage);
    itemScore.prepend(itemStarIcon);

    itemCard.append(itemTitle);
    itemCard.append(itemScore);

    itemBox.append(itemCard);

    itemBox.addEventListener('click', async () => {
      onClick(await MovieDetailFetcher.fetchMovieDetail(id));
    });

    return itemBox;
  },

  makeNoImage() {
    const itemImage = document.createElement('img');
    itemImage.classList.add('item-thumbnail', 'no-image');
    itemImage.setAttribute('src', NoImage);
    itemImage.setAttribute('loading', 'lazy');
    itemImage.setAttribute('alt', 'no image');

    return itemImage;
  },
};

export default MovieItem;
