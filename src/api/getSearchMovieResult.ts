import baseApi from "./baseApi";

export const getSearchMovieResult = async (inputData: string, page: number) => {
  const searchResult = await baseApi("/search/movie", {
    query: inputData,
    include_adult: false,
    page,
  });

  return searchResult;
};
