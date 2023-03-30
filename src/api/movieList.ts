import { URL } from "../constant/constant";

class CustomError extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

export const getPopularMovie = async (currentPage: number) => {
  try {
    const response = await fetch(
      `${URL.BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=${currentPage}`
    );
    const data = await response.json();
    currentPage++;

    const popularMovieData = { data, currentPage };
    return popularMovieData;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      if (error.response && error.response.status >= 500) {
        alert("뭔가 에러가 발생했습니다!!!!!");
      } else {
        console.error(error);
      }
    }
  }
};
