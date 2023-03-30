import { URL } from "../constant/constant";

class CustomError extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

export const getCurrentResult = async (
  keyword: string,
  currentPage: number
) => {
  try {
    const response = await fetch(
      `${URL.BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${keyword}&page=${currentPage}`
    );
    const data = await response.json();
    currentPage++;

    return { data, currentPage };
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
