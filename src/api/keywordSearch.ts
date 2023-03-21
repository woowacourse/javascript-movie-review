const BASE_URL = "https://api.themoviedb.org/3";

export const getCurrentResult = async (
  keyword: string,
  currentPage: number
) => {
  try {
    console.log(process.env.BASE_URL);
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${keyword}&page=${currentPage}`
    );
    const data = await response.json();
    currentPage++;
    return { data, currentPage };
  } catch (e) {
    console.log(e);
  }
};
