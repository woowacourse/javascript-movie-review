import { Response } from "../../types/response";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const BASE_URL = "https://api.themoviedb.org/3";

export const apiClient = {
  get: (endpoint: string, headers?: {}) => request("GET", endpoint, headers),
};

async function request(
  method: HttpMethod,
  endpoint: string,
  headers?: {}
): Promise<Response> {
  const url = BASE_URL + endpoint;
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      accept: "application/json",
      ...headers,
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return { status: "success", data: data };
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return { status: "fail", data: [] };
  }
}
