import { EMPTY_OVERVIEW } from '../../constants/INFORMATION';
import DetailMovieData from '../../interfaces/DetailMovieData';
import { MOVIE_POSTER_URL } from '../../constants/MOVIES_URL';
import { starFilled } from '../../resources';
import StarImg from './StarImg';
import MyRatingContainer from './MyRatingContainer';

const MovieItemDetailContentContainer = {
  create(detailMovieData: DetailMovieData) {
    const movieItemDetailContentContainer = document.createElement('div');

    const movieItemDetailThumbnail = this.createThumbnail(detailMovieData);
    const movieItemDetailContent = this.createContent(detailMovieData);

    movieItemDetailContentContainer.classList.add('movie-item-detail_content-container');

    movieItemDetailContentContainer.appendChild(movieItemDetailThumbnail);
    movieItemDetailContentContainer.appendChild(movieItemDetailContent);

    return movieItemDetailContentContainer;
  },

  createThumbnail(detailMovieData: DetailMovieData) {
    const thumbnail = document.createElement('img');

    thumbnail.classList.add('movie-item-detail_thumbnail');
    thumbnail.src = `${MOVIE_POSTER_URL}${detailMovieData.poster_path}`;
    thumbnail.loading = 'lazy';
    thumbnail.alt = detailMovieData.title;

    return thumbnail;
  },

  createContent(detailMovieData: DetailMovieData) {
    const content = document.createElement('div');

    const contentDetail = this.createContentDetail(detailMovieData);
    const contentMyRatingContainer = MyRatingContainer.create();

    content.classList.add('movie-item-detail_content');

    content.appendChild(contentDetail);
    content.appendChild(contentMyRatingContainer);

    return content;
  },

  createContentDetail(detailMovieData: DetailMovieData) {
    const contentDetail = document.createElement('div');

    const genresRatingContainer = this.createGenresRatingContainer(detailMovieData);
    const overview = this.createOverview(detailMovieData);

    contentDetail.classList.add('movie-item-detail_content-detail');

    contentDetail.appendChild(genresRatingContainer);
    contentDetail.appendChild(overview);

    return contentDetail;
  },

  createGenresRatingContainer(detailMovieData: DetailMovieData) {
    const genresRatingContainer = document.createElement('div');

    const genres = this.createGenres(detailMovieData);
    const rating = this.createRating(detailMovieData);

    genresRatingContainer.classList.add('movie-item-detail_genres-rating-container');

    genresRatingContainer.appendChild(genres);
    genresRatingContainer.appendChild(rating);

    return genresRatingContainer;
  },

  createGenres(detailMovieData: DetailMovieData) {
    const genres = document.createElement('p');

    genres.textContent = detailMovieData.genres.map((genre) => genre.name).join(', ');

    return genres;
  },

  createRating(detailMovieData: DetailMovieData) {
    const rating = document.createElement('div');

    const ratingStarImg = StarImg.create(starFilled);
    const ratingNumber = document.createElement('p');

    rating.classList.add('item-score');
    rating.classList.add('movie-item-detail_rating');
    ratingNumber.textContent = detailMovieData.vote_average.toFixed(1);

    rating.appendChild(ratingStarImg);
    rating.appendChild(ratingNumber);

    return rating;
  },

  createOverview(detailMovieData: DetailMovieData) {
    const overview = document.createElement('p');

    if (detailMovieData.overview) overview.textContent = detailMovieData.overview;
    else overview.textContent = EMPTY_OVERVIEW;

    overview.classList.add('movie-item-detail_overview');

    return overview;
  },
};

export default MovieItemDetailContentContainer;
