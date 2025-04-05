import { isHTMLElement } from "../../utils/typeGuards";

export interface ModalStrategy {
  renderInitial(parent: HTMLElement): void;
  fetchAndRender(id: number, parent: HTMLElement): Promise<void>;
}

class Modal {
  private parentElement: HTMLElement;
  private strategy: ModalStrategy;

  constructor(parentElement: HTMLElement, strategy: ModalStrategy) {
    this.parentElement = parentElement;
    this.strategy = strategy;
  }

  renderInitial(parent: HTMLElement, skeleton: string): void {
    parent.innerHTML = skeleton;
  }

  public async show(id: number) {
    try {
      this.activate();
      this.strategy.renderInitial(this.parentElement);
      await this.strategy.fetchAndRender(id, this.parentElement);
      this.addCloseEvents();
    } catch (e) {
      this.renderError("데이터를 불러오지 못했습니다.", () => this.show(id));
    }
  }

  private activate() {
    document.querySelector(".modal-background")?.classList.add("active");
    document.body.classList.add("active");
    document.addEventListener("keydown", this.keyDownHandler);
  }

  private deactivate() {
    document.querySelector(".modal-background")?.classList.remove("active");
    document.body.classList.remove("active");
    document.removeEventListener("keydown", this.keyDownHandler);
  }

  private addCloseEvents() {
    const $closeModal = document.querySelector("#closeModal");
    const $modalBackground = document.querySelector(".modal-background");

    if (!isHTMLElement($closeModal) || !isHTMLElement($modalBackground)) return;

    $closeModal.addEventListener("click", () => {
      this.deactivate();
    });
    $modalBackground.addEventListener("click", (e) => {
      if (e.target === $modalBackground) this.deactivate();
    });
  }

  private keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") this.deactivate();
  };

  private renderError(message: string, retry: () => void) {
    this.parentElement.innerHTML = `
      <div class="modal-error">
        <img src="./images/dizzy_planet.png" alt="error" />
        <p>${message}</p>
        <button class="retry-button" id="retryButton">다시 시도</button>
      </div>`;
    document.querySelector("#retryButton")?.addEventListener("click", retry);
  }
}

export default Modal;
