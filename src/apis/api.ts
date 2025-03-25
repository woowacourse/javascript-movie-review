export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const api = async (
  baseURL: string,
  token: string,
  endpoint: string,
  method: HttpMethod,
  params = {}
) => {
  const url = new URL(`${baseURL}${endpoint}`);
  url.search = new URLSearchParams(params).toString();

  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  return response.json();
};

export default api;
