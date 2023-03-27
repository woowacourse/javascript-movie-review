import "./index.css";

import xButton from "../../../templates/xButton.png";

import { fetchMovieDetailById } from "../../utils/api";
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

  open(movieId: number, modalType: "movieDetail" | string) {
    const modalSection = $(".modal-section");

    if (modalType === "movieDetail")
      fetchMovieDetailById(movieId).then((movieDetail) => {
        this.#$movieDetail.render(movieDetail, movieId);

        if (modalSection instanceof HTMLElement)
          modalSection.style.display = "block";
      });
  }

  close() {
    const modalSection = $(".modal-section");
    const modalHeader = $(".modal-header--text");

    if (modalSection instanceof HTMLElement)
      modalSection.style.display = "none";

    if (modalHeader instanceof HTMLElement) modalHeader.textContent = "";
  }
}
