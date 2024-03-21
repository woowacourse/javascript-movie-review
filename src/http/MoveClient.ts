import { BASE_URL } from "../constants/movies";

class MovieClient {
  private BASE_URL: string;

  private MOVIE_API_END_POINT = {
    popular: (currentPage: number) => `movie/popular?language=ko-KR&page=${currentPage}`,
    search: (currentPage: number, searchKeyword: string) =>
      `search/movie?query=${searchKeyword}&include_adult=false&language=ko-KR&page=${currentPage}`,
  };

  constructor(baseUrl: string) {
    this.BASE_URL = baseUrl;
  }

  private decideEndPoint(currentPage: number, searchKeyword: string): string {
    if (searchKeyword === "") return this.MOVIE_API_END_POINT.popular(currentPage);
    return this.MOVIE_API_END_POINT.search(currentPage, searchKeyword);
  }

  private handleResponseStatus(status: number) {
    if (status === 200) return;

    switch (status) {
      case 401:
        throw new Error("유효하지 않은 access_token 입니다. 재설정 후, 다시 요청해주세요.");
      case 403:
        throw new Error("해당 컨텐츠에 대한 접근 권한이 없습니다.");
      case 404:
        throw new Error("요청한 컨텐츠를 찾을 수 없습니다. 요청 URL을 다시 확인해주세요.");
      case 500:
        throw new Error("서버에서 알 수 없는 문제가 발생했습니다.");
      case 503:
        throw new Error("서버가 컨텐츠를 보여줄 준비가 되지 않았습니다.");
    }
  }

  public async get<T>(currentPage: number, searchKeyword: string): Promise<T | undefined> {
    const url = this.decideEndPoint(currentPage, searchKeyword);

    const response = await fetch(`${this.BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    this.handleResponseStatus(response.status);

    return response.json();
  }
}

export default new MovieClient(BASE_URL);
