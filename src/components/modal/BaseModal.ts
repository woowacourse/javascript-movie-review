import EventComponent from "../abstract/EventComponent";
import { HTMLTemplate, TargetId } from "../../types/common";
import { $ } from "../../utils/dom";

interface BaseModalProps {
  targetId: TargetId;
}

export default abstract class BaseModal extends EventComponent {
  constructor({ targetId }: BaseModalProps) {
    super({ targetId });
  }

  protected getTemplate(): HTMLTemplate {
    return `
        <div id="modal-backdrop" class="modal-backdrop"></div>
        <div class="modal-container">
            ${this.getModalContent()}
        </div>
    `;
  }

  protected abstract getModalContent(): HTMLTemplate;

  protected setEvent(): void {
    $<HTMLElement>("modal-backdrop")?.addEventListener(
      "click",
      this.closeModal.bind(this)
    );

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeModal();
      }
    });
  }

  protected closeModal(): void {
    const $modal = $<HTMLElement>(this.targetId);

    if (!$modal) {
      return;
    }

    $modal.classList.remove("modal-open");
    $modal.classList.add("modal");
  }
}
