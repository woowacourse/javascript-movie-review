import { renderResultSectionContent } from "./renderResultSectionContent";

export const renderInitialUI = () => {
  renderResultSectionContent({
    isLoading: true,
    isError: false,
    isLastPage: true,
    movies: [],
  });
};
