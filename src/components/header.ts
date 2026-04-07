import { createLogo } from "./logo";
import { createSearchForm } from "./search-form";
import { Router } from "../route/router";
import { ROUTES } from "../route/constants";
export function createHeader(router: Router): HTMLElement {
  const header = document.createElement("header");

  const logo = createLogo();
  const searchFormWrapper = createSearchForm();
  const blank = document.createElement("div");
  blank.className = "header-blank";

  header.append(logo, searchFormWrapper, blank);

  bindLogoClick(logo, router);
  bindSearchSubmit(searchFormWrapper, router);

  return header;
}

function bindLogoClick(logo: HTMLElement, router: Router): void {
  logo.addEventListener("click", (e) => {
    e.preventDefault();
    router.navigate(ROUTES.MAIN);
  });
}

function bindSearchSubmit(
  searchFormWrapper: HTMLElement,
  router: Router,
): void {
  const form = searchFormWrapper.querySelector("form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = (new FormData(form).get("query") as string).trim();
    if (!query) return;
    router.navigate(`${ROUTES.SEARCH}?query=${encodeURIComponent(query)}`);
  });
}
