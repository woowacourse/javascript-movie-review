import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import { FilledStar } from '../../../assets';

interface MovieDetailModalProps {
  key: number;
}

class MovieDetailModal extends Component<MovieDetailModalProps> {
  protected render(): void {
    new Modal(this.$element, { id: 'movie-detail-modal', children: this.createComponent() });
  }

  protected createComponent() {
    console.log(this.props?.key);

    return /* html */ `
      <div>
        <div>해리 포터 20주년: 리턴 투 호그와트</div>
        <div>
            <img src="" alt="해리 포터" />
            <div>
                <p>액션, 코미디, 영화</p>
                <p>해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며, 배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이 이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의 오디션 과정과 시리즈가 끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난 배우들에 대한 기억들을 회상하는 시간도 가졌다.</p>
                <div>
                    <p>내 별점</p>
                    ${Array.from({ length: 5 })
                      .map(() => `<img src=${FilledStar} alt="별" />`)
                      .join('')}
                </div>
            </div>
        </div>
      </div>
    `;
  }
}

export default MovieDetailModal;
