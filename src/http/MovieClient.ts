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

  public async fetch(url: string, params: URLSearchParams) {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    this.handleResponseStatus(response.status);
    return response.json();
  }

  public async getPopularMovies(page: number) {
    const params = new URLSearchParams({ language: "ko-KR", page: page.toString() });
    const url = `${BASE_URL}/movie/popular`;
    const data = await this.fetch(url, params);

    return data.results.map((result: { id: number; title: string; poster_path: string; vote_average: number }) => ({
      id: result.id,
      title: result.title,
      voteAverage: result.vote_average,
      thumbnail: `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`,
    }));
  }

  public async getSearchMovies(page: number, searchKeyword: string) {
    const params = new URLSearchParams({ language: "ko-KR", include_adult: "false", page: page.toString(), query: searchKeyword });
    const url = `${BASE_URL}/search/movie`;
    const data = await this.fetch(url, params);

    return data.results.map((result: { id: number; title: string; poster_path: string; vote_average: number }) => ({
      id: result.id,
      title: result.title,
      voteAverage: result.vote_average,
      thumbnail: `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`,
    }));
  }

  public async getMovieDetail(movieId: number = 1011985) {
    const params = new URLSearchParams({ language: "ko-KR" });
    const url = `${BASE_URL}/movie/${movieId}`;
    const data = await this.fetch(url, params);

    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      genres: data.genres.map((genre: { name: string }) => genre.name),
      voteAverage: data.vote_average,
      thumbnail: `https://image.tmdb.org/t/p/w220_and_h330_face/${data.poster_path}`,
    };
  }
}

export default new MovieClient();
