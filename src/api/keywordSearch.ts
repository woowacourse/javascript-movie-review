const BASE_URL = "https://api.themoviedb.org/3";

export const getSearchResult = () => {
  let currentPage = 1;

  return async function getCurrentResult(keyword: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${keyword}&page=${currentPage}`
      );
      const data = await response.json();
      currentPage += 1;
      return { data, currentPage };
    } catch (e) {
      console.log(e);
    }
  };
};
