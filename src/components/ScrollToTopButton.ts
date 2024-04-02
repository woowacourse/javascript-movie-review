import { $ } from "../utils/dom";
import EventComponent from "./abstract/EventComponent";

export default class ScrollToTopButton extends EventComponent {
  protected getTemplate(): string {
    return `
      <div id="scroll-to-top-button" class="scroll-to-top-button">🔝</div>
    `;
  }

  protected setEvent(): void {
    $("scroll-to-top-button")?.addEventListener("click", this.scrollToTop);
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
