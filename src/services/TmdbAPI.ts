class TmdbAPI {
  private static domain = 'https://api.themoviedb.org/3';
  private static language = 'ko-KR';

  private static createUrl(path: string, params: Record<string, string>): string {
    const queryString = new URLSearchParams({ ...params, language: this.language }).toString();
    return `${this.domain}/${path}?${queryString}`;
  }

  /* TMDB API 공식문서에 따라 그룹화 */
  public static url = {
    movie: {
      popular: (params: { page: string }) => this.createUrl('movie/popular', params)
    },
    search: {
      movie: (params: { query: string; page: string }) => this.createUrl('search/movie', params)
    }
  } as const;

  public static fetch<T extends TmdbResponse<Movie>>(url: string): Promise<T> {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => response as T);
  }
}

export default TmdbAPI;
