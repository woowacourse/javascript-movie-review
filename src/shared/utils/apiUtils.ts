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

export const fetchApi = async <T, R>(
  url: string,
  mapper: (data: R) => T
): Promise<T> => {
  const response = await fetch(url, {
    ...API_OPTIONS,
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const data: R = await response.json();
  return mapper(data);
};
