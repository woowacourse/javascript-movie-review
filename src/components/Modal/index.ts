import "./index.css";

import xButton from "../../../templates/xButton.png";

import { $ } from "../../utils/selector";
import { MovieDetailModal } from "./MovieDetailModal";

export class Modal {
  #$movieDetail;

  constructor($target: Element) {
    this.#$movieDetail = new MovieDetailModal($target);

    ($(".x-button") as HTMLImageElement).src = xButton;

    this.bindEvent();
  }

  bindEvent() {
    $(".modal-backdrop").addEventListener("click", () => {
      this.close();
    });

    $(".x-button").addEventListener("click", () => {
      this.close();
    });

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") this.close();
    });
  }

  open(modalType: "movieDetail" | string, movieId: number | undefined) {
    const modalSection = $(".modal-section");

    if (modalType === "movieDetail" && movieId)
      return this.#$movieDetail.render(movieId).then(() => {
        if (modalSection instanceof HTMLElement)
          modalSection.style.display = "block";
      });

    if (modalSection instanceof HTMLElement)
      modalSection.style.display = "block";
  }

  close() {
    const $modalSection = $(".modal-section");
    const $modalHeader = $(".modal-header--text");
    const $modalContent = $(".modal-content");

    if ($modalSection instanceof HTMLElement)
      $modalSection.style.display = "none";

    if ($modalHeader instanceof HTMLElement) $modalHeader.textContent = "";

    if ($modalContent instanceof HTMLElement) $modalContent.innerHTML = "";
  }
}
