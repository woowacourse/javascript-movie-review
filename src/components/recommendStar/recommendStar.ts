import filledStar from '../../images/star_filled.png';
import emptyStar from '../../images/star_empty.png';
import { SCORE_MESSAGE } from '../../constants/constant';
import { UserMovieDetail } from '../../interface/Movie';
export class RecommendStar {
  private userMovieDetail;
  private currentScore: number;
  private total: number;
  private stars: HTMLImageElement[];
  constructor(userMovieDetail: UserMovieDetail, total: number) {
    this.userMovieDetail = userMovieDetail;
    this.currentScore = userMovieDetail.userVote;
    this.total = total;
    this.stars = Array.from({ length: this.total }, (_, index) => {
      const star = document.createElement('img');
      star.className = 'recommend-star';
      if (index < Math.round(this.currentScore / 2)) {
        star.src = filledStar;
      } else {
        star.src = emptyStar;
      }

      return star;
    });
  }
  createRecommendStar() {
    const recommendStar = this.render();

    return recommendStar;
  }

  render() {
    const recommendStarBox = document.createElement('div');
    recommendStarBox.className = 'recommend-box';

    const span = document.createElement('span');
    span.textContent = '별점';

    const starBox = document.createElement('div');
    starBox.className = 'recommend-star-box';

    const recommendScore = document.createElement('span');

    const recommendMessage = document.createElement('span');
    recommendMessage.className = 'recommend-message';
    if (this.currentScore !== 0) {
      this.rerenderScore(recommendScore);
      this.rerenderScoreMessage(recommendMessage);
    }

    starBox.append(...this.stars);
    recommendStarBox.append(span, starBox, recommendScore, recommendMessage);
    this.stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        this.currentScore = (index + 1) * 2;
        this.rerenderStar();
        this.rerenderScore(recommendScore);
        this.rerenderScoreMessage(recommendMessage);
        this.setRecommendList();
      });
    });
    return recommendStarBox;
  }

  rerenderStar() {
    this.stars.forEach((element, index) => {
      if (index <= this.currentScore / 2 - 1) {
        element.src = filledStar;
        return;
      }
      element.src = emptyStar;
    });
  }

  rerenderScore(recommendScore: HTMLElement) {
    recommendScore.textContent = this.currentScore.toString();
  }
  rerenderScoreMessage(recommendMessage: HTMLElement) {
    recommendMessage.textContent = SCORE_MESSAGE[this.currentScore];
  }

  setRecommendList() {
    const recommendList = JSON.parse(localStorage.getItem('recommendList') || '[]');

    const findRecommend = recommendList.find((movie: UserMovieDetail) => movie.id === this.userMovieDetail.id);
    if (findRecommend) {
      findRecommend.userVote = this.currentScore;
    } else {
      this.userMovieDetail.userVote = this.currentScore;
      recommendList.push(this.userMovieDetail);
    }
    console.log(recommendList);
    localStorage.setItem('recommendList', JSON.stringify(recommendList));
  }
}
