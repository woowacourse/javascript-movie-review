import Modal from '../modal/Modal';
import { fetchMovieDetail } from '../../apis/fetchData';
import closeIcon from '../../images/close_icon.png';
import emptyPng from '../../images/empty_poster.png';
import filledStar from '../../images/star_filled.png';
import emptyStar from '../../images/star_empty.png';

class MovieDetailModal extends Modal {
  #movieId;

  constructor(movieId: any) {
    super();
    this.#movieId = movieId;
    this.getDetailData();
  }

  async getDetailData() {
    try {
      const result = await fetchMovieDetail(this.#movieId);
      console.log(result);
      const detailMovieContent = this.generateDetailTemplate(result);
      this.setContent(detailMovieContent);
    } catch (error) {
      console.error('Error loading movie detail:', error);
    }
  }

  generateDetailTemplate(movie: any) {
    const detailContent = document.createElement('div');
    detailContent.className = 'detail-content';

    // 영화 제목
    const title = document.createElement('h3');
    title.className = 'detail-title';
    title.textContent = movie.title;

    // 닫힘 버튼
    const closeButton = document.createElement('div');
    closeButton.className = 'close-btn';

    title.appendChild(closeButton);

    const closeImage = document.createElement('img');
    closeImage.src = closeIcon;
    closeImage.alt = '닫힘 버튼';
    closeButton.appendChild(closeImage);

    // 서브 정보
    const subDetail = document.createElement('div');
    subDetail.className = 'sub-detail';

    // 썸네일
    const thumbnail = document.createElement('img');
    thumbnail.className = 'detail-thumbnail';
    thumbnail.src = movie.posterPath ? `https://image.tmdb.org/t/p/w500/${movie.posterPath}.jpg` : emptyPng;
    thumbnail.alt = movie.title;

    // 설명(장르, 별점, 오버뷰, 내 별점)
    const description = document.createElement('div');
    description.className = 'detail-description';

    const mainDescription = document.createElement('div');
    mainDescription.className = 'detail-main-description';

    const firstDescription = document.createElement('div');
    firstDescription.className = 'detail-first-description';

    // 장르
    const genres = document.createElement('p');
    genres.className = '';
    const genreNames = movie.genres.map((genre: { id: number; name: string }) => genre.name);
    genres.textContent = genreNames.join(',');

    // 별점
    const score = document.createElement('p');
    score.className = 'detail-score';
    score.textContent = String(movie.voteAverage.toFixed(1));

    const scoreImage = document.createElement('img');
    scoreImage.src = filledStar;
    scoreImage.alt = '별점';

    score.prepend(scoreImage);

    firstDescription.append(genres, score);

    // 오버뷰
    const overview = document.createElement('p');
    overview.className = 'detail-overview';
    overview.textContent = movie.overview;

    mainDescription.append(firstDescription, overview);

    // 내 별점
    const myScore = document.createElement('div');
    myScore.className = 'detail-my-score';
    myScore.textContent = '내 별점';

    const starsContainer = document.createElement('div');
    starsContainer.className = 'detail-stars';
    for (let i = 0; i < 5; i++) {
      const emptyStarImage = document.createElement('img');
      emptyStarImage.src = emptyStar;
      emptyStarImage.alt = '별점';
      starsContainer.appendChild(emptyStarImage);
    }

    const scoreNumber = document.createElement('div');
    scoreNumber.className = 'detail-score-number';
    scoreNumber.textContent = '6';

    const scoreText = document.createElement('div');
    scoreText.className = 'detail-score-text';
    scoreText.textContent = '보통이에요';

    myScore.append(starsContainer, scoreNumber, scoreText);

    description.append(mainDescription, myScore);
    subDetail.append(thumbnail, description);
    detailContent.append(title, subDetail);
    return detailContent;
  }
}

export default MovieDetailModal;
