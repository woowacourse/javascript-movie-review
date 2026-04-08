import {
  renderMainLoading,
  renderSearchLoading,
} from "./renderResultSectionContent";

export const renderLoadingUI = () => {
  const url = new URL(window.location.href);
  const keyword = url.searchParams.get("keyword");

  if (keyword) {
    renderSearchLoading(keyword);
  } else {
    renderMainLoading();
  }
};
