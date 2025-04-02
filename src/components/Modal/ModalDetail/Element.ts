import { $ } from "../../../utils/querySelectors";

export const $modalImage = $<HTMLImageElement>(".modal-image img");
export const $modalDescriptionTitle = $<HTMLHeadingElement>(
  ".modal-description h2"
);
export const $modalDescriptionCategory = $<HTMLParagraphElement>(
  ".modal-description .category"
);
export const $modalDescriptionRate = $<HTMLSpanElement>(
  ".modal-description .rate span"
);
export const $modalDescriptionDetail = $<HTMLParagraphElement>(
  ".modal-description .detail"
);
