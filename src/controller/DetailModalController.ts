import DetailModal from "../component/DetailModal";
import { $ } from "../util/selector";

class DetailModalController {
  wrapElement;
  detailModalElement: HTMLElement | null = null;

  constructor() {
    this.wrapElement = $("#wrap");
  }

  bindEvents() {
    this.detailModalElement?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.closeModal();
    });
  }

  showModal() {
    this.detailModalElement = DetailModal();
    this.wrapElement?.insertAdjacentElement("afterend", this.detailModalElement);
    this.bindEvents();
  }

  closeModal() {
    if (this.detailModalElement) this.detailModalElement.remove();
  }
}
export default DetailModalController;
