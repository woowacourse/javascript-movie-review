type QueryParams = {
  [key: string]: string | number | boolean | undefined;
};

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const baseApi = async (path: string, query?: QueryParams) => {
  const defaultParams = { language: "ko-KR" };

  const searchParams = new URLSearchParams(
    Object.entries({ ...defaultParams, ...query }).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const url = `${BASE_URL}${path}?${searchParams.toString()}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_code);
  }

  return await response.json();
};

export default baseApi;
