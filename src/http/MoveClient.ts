import { BASE_URL } from "../constants/movies";

class MovieClient {
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
      default:
        throw new Error("알 수 없는 에러가 발생하였습니다");
    }
  }

  public async getPopularMovies(page: number) {
    const params = new URLSearchParams({ language: "ko-KR", page: page.toString() });
    const url = `${BASE_URL}/movie/popular?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    this.handleResponseStatus(response.status);

    return response.json();
  }

  public async getSearchMovies(page: number, searchKeyword: string) {
    const params = new URLSearchParams({ language: "ko-KR", include_adult: "false", page: page.toString(), query: searchKeyword });
    const url = `${BASE_URL}/search/movie?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    this.handleResponseStatus(response.status);

    return response.json();
  }

  public async getMovieDetail(movieId: number) {
    // curl --request GET \
    //  --url 'https://api.themoviedb.org/3/movie/1011985?language=ko-KR' \
    //  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGJiZmJiMmJkM2RhYzVmNzUwMzM4ZWJkYzExMzk2OCIsInN1YiI6IjY1ZjgzNTc3ZTIxMDIzMDE3ZWVmZmUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JXS5CUlLDrvIO0gE6ltYYHxKSVQs3A4_NgKCUzPQtu0' \
    //  --header 'accept: application/json'
    const params = new URLSearchParams({ language: "ko-KR" });
    const url = `${BASE_URL}/movie/${movieId}?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    this.handleResponseStatus(response.status);

    return response.json();
  }
}

export default new MovieClient();
