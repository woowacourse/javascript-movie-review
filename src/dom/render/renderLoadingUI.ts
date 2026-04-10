import { renderMainLoading } from "../../pages/home";
import { renderSearchLoading } from "../../pages/search";

export const renderLoadingUI = () => {
  const url = new URL(window.location.href);
  const keyword = url.searchParams.get("keyword");

  if (keyword) {
    renderSearchLoading(keyword);
  } else {
    renderMainLoading();
  }
};
