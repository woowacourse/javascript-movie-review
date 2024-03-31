import { CONFIG } from '../../../constant/config';
import { MovieDetailData } from '../../../interface/MovieInterface';

export default function MovieDetailContentSection(movie: MovieDetailData) {
  const section = document.createElement('section');
  section.id = 'modal__movie-detail__content';

  const posterImage = createPosterImage(movie.posterPath, movie.title);
  const movieInfoContainer = createMovieInfoContainer(movie);

  section.append(posterImage, movieInfoContainer);
  return section;
}

function createPosterImage(posterPath: string, title: string) {
  const posterImage = document.createElement('img');
  posterImage.classList.add('poster-image');
  posterImage.src = posterPath;
  posterImage.title = title;
  return posterImage;
}

function createMovieInfoContainer(movie: MovieDetailData) {
  const container = document.createElement('div');
  container.classList.add('movie-info-container');

  const movieInfoBox = createMovieInfoBox(movie);
  container.append(movieInfoBox);

  return container;
}

function createMovieInfoBox(movie: MovieDetailData) {
  const movieInfoBox = document.createElement('div');
  movieInfoBox.classList.add('movie-info-box');

  const movieInfo = createMovieInfo(movie.genres, movie.voteAverage);

  const movieOverview = document.createElement('p');
  movieOverview.classList.add('movie-overview');
  movieOverview.textContent = movie.overview;

  movieInfoBox.append(movieInfo, movieOverview);
  return movieInfoBox;
}

function createMovieInfo(genres: string[], voteAverage: number) {
  const movieInfo = document.createElement('p');
  movieInfo.classList.add('movie-info');
  movieInfo.textContent = genres.join(', ');

  const averageScore = document.createElement('span');
  averageScore.classList.add('average-score');
  averageScore.textContent = voteAverage.toFixed(CONFIG.userScoreDecimalPlaces).toString();

  movieInfo.append(averageScore);
  return movieInfo;
}
