/* fetch response 구조분해 할당을 위하여 다음 규칙 비활성화 */
/* eslint-disable camelcase */

import MY_SCORE_TEXT from '../constants/constants';
import IMG_SRC from '../constants/imgSrc';
import LocalStorageAPI from '../services/LocalStorageAPI';
import TmdbAPI from '../services/TmdbAPI';
import { $, $$ } from '../utils/domUtils';

class DetailModalController {
  /* 리뷰어님의 피드백을 받고 싶어서 극단적으로 요소들의 state를 만들어봤습니다 */
  public static state = {
    currentId: '',
    $modal: <HTMLDialogElement>{},
    $poster: <HTMLImageElement>{},
    $title: <HTMLHeadingElement>{},
    $genres: <HTMLParagraphElement>{},
    $voteAverage: <HTMLParagraphElement>{},
    $overview: <HTMLParagraphElement>{},
    $scoreNumber: <HTMLParagraphElement>{},
    $scoreText: <HTMLParagraphElement>{},
    $starButtonList: <NodeListOf<HTMLButtonElement>>{}
  };

  public static initController() {
    this.state.$modal = $<HTMLDialogElement>('.detail-modal')!;
    this.state.$poster = $<HTMLImageElement>('.detail-modal-poster-image')!;
    this.state.$title = $<HTMLHeadingElement>('.detail-modal-title')!;
    this.state.$genres = $<HTMLParagraphElement>('.detail-modal-genres')!;
    this.state.$voteAverage = $<HTMLParagraphElement>('.detail-modal-score')!;
    this.state.$overview = $<HTMLParagraphElement>('.detail-modal-overview')!;
    this.state.$starButtonList = $$<HTMLButtonElement>('.detail-modal-star-button');
    this.state.$scoreNumber = $<HTMLParagraphElement>('.detail-modal-score-number')!;
    this.state.$scoreText = $<HTMLParagraphElement>('.detail-modal-score-text')!;
    this.state.$starButtonList = $$<HTMLButtonElement>('.detail-modal-star-button')!;

    this.state.$modal.addEventListener('click', (event: Event) => {
      if (event.target instanceof Element && event.target.nodeName === 'DIALOG') {
        this.state.$modal.close();
      }
    });
  }

  public static async showModal(id: string) {
    this.state.currentId = id;

    const response = await TmdbAPI.fetch({ path: TmdbAPI.PATH.details(id) });
    this.updateModal(response);

    const value = LocalStorageAPI.getItem(id) ?? '0';
    this.updateScoreBox(value);

    this.state.$modal.showModal();
  }

  public static closeModal() {
    this.state.$modal.close();
  }

  public static updateModal({ poster_path, title, genres, vote_average, overview }: TmdbResponse) {
    this.state.$poster.src = TmdbAPI.IMG_URL + poster_path;
    this.state.$title.textContent = title;
    this.state.$genres.textContent = genres.map((genre) => genre.name).join(', ');
    this.state.$voteAverage.textContent = vote_average.toFixed(1);
    this.state.$overview.textContent = overview;
  }

  public static updateScoreBox(value: string) {
    LocalStorageAPI.setItem(this.state.currentId, value);

    this.state.$scoreNumber.textContent = value;
    this.state.$scoreText.textContent = MY_SCORE_TEXT[value as keyof typeof MY_SCORE_TEXT];

    this.updateStarButtonList(value);
  }

  private static updateStarButtonList(value: string) {
    this.state.$starButtonList.forEach((button) => {
      let image;
      if (Number(button.value) <= Number(value)) image = IMG_SRC.start_filled;
      else image = IMG_SRC.star_empty;
      button.style.backgroundImage = `url(${image})`;
    });
  }
}

export default DetailModalController;
