import { DetailModalRender, DetailModalMount } from "./index.js";

export async function openDetailModal(movieDetail) {
  if (!movieDetail) return;

  const modalHTML = DetailModalRender(movieDetail);

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  DetailModalMount();
}
