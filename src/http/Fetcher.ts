import { HttpFetcher } from "../types/http";

export default class Fetcher implements HttpFetcher {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private handleResponseStatus(status: number) {
    if (status === 200) return;

    switch (status) {
      case 401:
        throw new Error("해당 컨텐츠에 대한 접근 권한이 없습니다.");
      case 403:
        throw new Error("해당 컨텐츠에 대한 접근 권한이 없습니다.");
      case 404:
        throw new Error("요청한 컨텐츠를 찾을 수 없습니다. 올바른 주소로 다시 요청해주세요.");
      case 500:
        throw new Error("서버에서 알 수 없는 문제가 발생해 페이지를 표시할 수 없습니다.");
      case 503:
        throw new Error("서버가 컨텐츠를 보여줄 준비가 되지 않았습니다.");
    }
  }

  public async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    this.handleResponseStatus(response.status);

    return response.json();
  }
}
