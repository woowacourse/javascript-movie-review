import TMDBError from "../../TMDBError";
import { renderSearchPage } from "../../pages/search.ts";
import { renderHomePage } from "../../pages/home.ts";

export const handleMainSeeMore = async () => {
  const prevPage = Number(sessionStorage.getItem("page") || 1);
  sessionStorage.setItem("page", String(prevPage + 1));

  try {
    await renderHomePage("append");
  } catch (error) {
    let errorMessage = "알 수 없는 에러가 발생했습니다.";
    if (error instanceof TMDBError) {
      errorMessage = "TMDB에서 데이터를 불러오는 중 에러가 발생했습니다";
    }
    window.alert(errorMessage);
  }
};

export const handleSearchSeeMore = async () => {
  const prevPage = Number(sessionStorage.getItem("page") || 1);
  sessionStorage.setItem("page", String(prevPage + 1));

  try {
    await renderSearchPage("append");
  } catch (error) {
    let errorMessage = "알 수 없는 에러가 발생했습니다.";
    if (error instanceof TMDBError) {
      errorMessage = "TMDB에서 데이터를 불러오는 중 에러가 발생했습니다";
    }
    window.alert(errorMessage);
  }
};
