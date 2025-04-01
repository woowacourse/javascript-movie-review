import URL from "../constants/url";
import API_OPTIONS from "../constants/apiOptions";

interface ApiParams {
  endpoint: string;
  params: {
    language: string;
    page?: number;
    query?: string;
    include_adult?: string;
  };
}

export const createApiUrl = ({ endpoint, params }: ApiParams) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `${URL.BASE_API_URL}${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;
};

export const fetchApi = async <T>(
  url: string,
  mapper: (data: any) => T
): Promise<T> => {
  const response = await fetch(url, {
    ...API_OPTIONS,
  });

  if (!response.ok) {
    throw new Error(`영화 데이터를 불러오는데 실패했습니다.`);
  }

  const data = await response.json();
  return mapper(data);
};
