import { renderResultSectionContent } from "./renderResultSectionContent";

export const renderLoadingUI = () => {
  renderResultSectionContent({
    isLoading: true,
    isError: false,
    isLastPage: true,
    movies: [],
  });
};
