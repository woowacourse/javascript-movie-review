import TMDBError from "../../TMDBError";
import { renderSearchUI } from "../render/renderSearchUI.ts";
import { renderMainUI } from "../render/renderMainUI.ts";

export const handleMainSeeMore = async () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);

  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  try {
    await renderMainUI();
  } catch (error) {
    let errorMessage = "알 수 없는 에러가 발생했습니다.";
    if (error instanceof TMDBError) {
      errorMessage = "TMDB에서 데이터를 불러오는 중 에러가 발생했습니다";
    }
    window.alert(errorMessage);
  }
};

export const handleSearchSeeMore = async (keyword: string) => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);

  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  try {
    await renderSearchUI(keyword);
  } catch (error) {
    let errorMessage = "알 수 없는 에러가 발생했습니다.";
    if (error instanceof TMDBError) {
      errorMessage = "TMDB에서 데이터를 불러오는 중 에러가 발생했습니다";
    }
    window.alert(errorMessage);
  }
};
