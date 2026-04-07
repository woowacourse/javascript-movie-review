import { ROUTES } from "../route/constants";
import logoSrc from "../../templates/images/logo.png";

export function createLogo(): HTMLElement {
  const anchor = document.createElement("a");
  anchor.className = "logo";
  anchor.href = ROUTES.MAIN;

  const img = document.createElement("img");
  img.src = logoSrc;
  img.alt = "MovieList";

  anchor.appendChild(img);
  return anchor;
}
