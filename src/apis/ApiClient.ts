import { isError, isString } from "@/lib/utils";

type HttpMethodType = "GET" | "POST" | "DELETE" | "PUT";
type FetchURLParameterType = Parameters<typeof fetch>[0];

export default class ApiClient {
  static get(url: FetchURLParameterType, options: RequestInit) {
    return this.#request("GET", url, options);
  }

  static async #request(
    method: HttpMethodType,
    url: FetchURLParameterType,
    options: RequestInit
  ) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          ...options.headers,
        },
        ...options,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "에러 발생");

      return data;
    } catch (error) {
      if (isError(error)) throw error;
      if (isString(error)) throw new Error(error);

      console.error(error);
    }
  }
}
