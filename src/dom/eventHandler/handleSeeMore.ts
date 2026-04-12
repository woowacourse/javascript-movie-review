import { renderSearchPage } from "../../pages/search.ts";
import { renderHomePage } from "../../pages/home.ts";

export const handleMainSeeMore = async () => {
  const prevPage = Number(sessionStorage.getItem("page") || 1);
  sessionStorage.setItem("page", String(prevPage + 1));

  await renderHomePage("append");
};

export const handleSearchSeeMore = async () => {
  const prevPage = Number(sessionStorage.getItem("page") || 1);
  sessionStorage.setItem("page", String(prevPage + 1));

  await renderSearchPage("append");
};
