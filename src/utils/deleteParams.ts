import fetchSearchMovies from "../fetch/fetchSearchMovies";
import fetchPopularMovies from "../fetch/fetchPopularMovies";

const currentPage = 1;

const deleteParams = async () => {
  let fetchedMovies;

  try {
    const params = new URLSearchParams(window.location.search);

    if (params.has("query")) {
      fetchedMovies = await fetchSearchMovies(
        params.get("query") ?? "",
        currentPage
      );
    } else {
      fetchedMovies = await fetchPopularMovies(currentPage);
    }
  } catch (error) {
    console.error("영화 데이터를 불러오는 중 에러가 발생했습니다:", error);
    fetchedMovies = [];
  }
};

export default deleteParams;
