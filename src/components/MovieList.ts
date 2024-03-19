import EventComponent from "./abstract/EventComponent";
import QueryState from "../states/QueryState";
import IMAGES from "../images";

interface MovieListProps {
  targetId: string;
  queryState: QueryState;
}

export default class MovieList extends EventComponent {
  private queryState: QueryState;

  constructor({ targetId, queryState }: MovieListProps) {
    super({ targetId });
    this.queryState = queryState;
  }

  getTemplate(): string {
    return `
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list">
          <li>
            <a href="#">
              <div class="item-card">
                <img
                  class="item-thumbnail"
                  src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                  loading="lazy"
                  alt="앤트맨과 와스프: 퀀텀매니아"
                />
                <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                <p class="item-score"><img src="${IMAGES.starFilled}" alt="별점" /> 6.5</p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="item-card">
                <img
                  class="item-thumbnail"
                  src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                  loading="lazy"
                  alt="앤트맨과 와스프: 퀀텀매니아"
                />
                <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                <p class="item-score"><img src="${IMAGES.starFilled}" alt="별점" /><span>6.5</span></p>
              </div>
            </a>
          </li>
        </ul>
        <button class="btn primary full-width">더 보기</button>
    `;
  }

  setEvent(): void {}
}
