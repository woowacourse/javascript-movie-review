import { URL } from "../constant/constant";

class CustomError extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

export const getMovieDetail = async (id: number) => {
  try {
    const response = await fetch(
      `${URL.BASE_URL}/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
    );
    const data = await response.json();

    return data;
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
