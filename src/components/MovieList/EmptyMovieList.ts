import IMAGES from "../../images";
import { $ } from "../../utils/dom";
import EventComponent from "../abstract/EventComponent";

interface EmptyMovieListProps {
  targetId: string;
  onHomeButton: () => void;
}

export default class EmptyMovieList extends EventComponent {
  private onHomeButton: () => void;

  constructor({ targetId, onHomeButton }: EmptyMovieListProps) {
    super({ targetId });
    this.onHomeButton = onHomeButton;
  }

  protected getTemplate(): string {
    return `
    <div class="fallback-container">
      <img class="fallback-image" src="${IMAGES.emptyMovieList}" />
      <p class="fallback-message">표시할 영화 정보가 없습니다.</p>
      <button id="home-button" class="fallback-handle-button">초기 화면으로 되돌아가기</button>
    </div>
`;
  }

  protected setEvent(): void {
    $<HTMLButtonElement>("home-button")?.addEventListener(
      "click",
      this.onHomeButton
    );
  }
}
