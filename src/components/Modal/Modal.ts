import Component from "../common/Component";

import { $ } from "../../utils/dom";
import { Optional } from "../../types/utility";

import "./Modal.css";

export default class Modal extends Component {
  private $dialog: Optional<HTMLDialogElement>;

  protected getTemplate() {
    return /*html*/ `
      <dialog id="modal"></dialog>
    `;
  }

  protected render(): void {
    this.$target.insertAdjacentHTML("afterend", this.getTemplate());

    const $dialog = $<HTMLDialogElement>("dialog#modal");

    if ($dialog) {
      this.$dialog = $dialog;
    }
  }

  protected setEvent(): void {
    this.$dialog?.addEventListener("click", (event: Event) => {
      if (event.target === event.currentTarget) {
        this.hideModal();
      }
    });
  }

  public hideModal() {
    if (!this.$dialog) return;

    this.$dialog.innerHTML = "";
    this.$dialog?.close();
  }

  public showModal(children: Element) {
    if (!this.$dialog) return;

    this.$dialog.appendChild(children);
    this.$dialog?.showModal();
  }
}
