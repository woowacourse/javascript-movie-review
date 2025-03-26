import { $ } from "../../utils/querySelectors";

export const $modal = $<HTMLDivElement>("#modalBackground");
export const $modalCloseButton = $<HTMLButtonElement>("#closeModal");
export const $modalContainer = $<HTMLDivElement>(".modal-container");
