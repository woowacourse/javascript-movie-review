export const getSearchResult = () => {
  let currentPage = 1;

  return async function getCurrentResult(keyword: string) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${keyword}&page=${currentPage}`
    );
    const data = await response.json();
    console.log(data?.results);
    currentPage += 1;

    return data.results;
  };
};

const getData = getSearchResult();
