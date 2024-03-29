import { fetchMovieDetail } from '../apis/fetchData';
import createMovieDetailModal from '../components/modal/detailModal';
import modal from '../components/modal/emptyModal';
import { Movie, MovieDetail, MovieDetailData, UserMovieDetail } from '../interface/Movie';

export function mapDataToMovies(movies: any): Movie[] {
  return movies.results.map((data: any) => {
    return {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
      vote_average: data.vote_average.toFixed(1),
    };
  });
}

export function mapDetailDataToMovie(movieDetail: MovieDetailData) {
  return {
    id: movieDetail.id,
    title: movieDetail.title,
    vote_average: movieDetail.vote_average.toFixed(1),
    poster_path: movieDetail.poster_path,
    overview: movieDetail.overview,
    genres: movieDetail.genres.map(genre => genre.name),
  };
}
export function MovieDetailToUserMovieDetail(movieDetail: MovieDetail, userVote = 0): UserMovieDetail {
  return {
    id: movieDetail.id,
    title: movieDetail.title,
    vote_average: movieDetail.vote_average,
    poster_path: movieDetail.poster_path,
    overview: movieDetail.overview,
    genres: movieDetail.genres.map(genre => genre),
    userVote,
  };
}
