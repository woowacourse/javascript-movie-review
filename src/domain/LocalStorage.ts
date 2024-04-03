import { MovieDetail, UserMovieDetail } from '../interface/Movie';
import { MovieDetailToUserMovieDetail } from './MovieService';

export function setRecommendList(userMovieDetail: UserMovieDetail, currentScore: number) {
  const recommendList = JSON.parse(localStorage.getItem('recommendList') || '[]');

  const findRecommend = recommendList.find((movie: UserMovieDetail) => movie.id === userMovieDetail.id);
  if (findRecommend) {
    findRecommend.userVote = currentScore;
  } else {
    userMovieDetail.userVote = currentScore;
    recommendList.push(userMovieDetail);
  }
  localStorage.setItem('recommendList', JSON.stringify(recommendList));
}

export function getSavedRecommend(movieDetail: MovieDetail) {
  const recommendList = JSON.parse(localStorage.getItem('recommendList') || '[]');
  if (recommendList.length !== 0) {
    const userMovieDetail = recommendList.find((movie: UserMovieDetail) => movie.id === movieDetail.id);
    if (userMovieDetail) {
      return userMovieDetail;
    }
    return MovieDetailToUserMovieDetail(movieDetail, 0);
  }
  return MovieDetailToUserMovieDetail(movieDetail, 0);
}
