class TmdbAPI {
  private static domain = 'https://api.themoviedb.org/3';
  private static language = 'ko-KR';

  private static createUrl(path: string, params: UrlParams): string {
    const queryString = new URLSearchParams({ ...params, language: this.language }).toString();
    return `${this.domain}/${path}?${queryString}`;
  }

  /* TMDB API 공식문서에 따라 그룹화 */
  public static PATH = {
    movie: {
      popular: 'movie/popular'
    },
    search: {
      movie: 'search/movie'
    }
  } as const;

  public static fetch({ path, params }: { path: string; params: UrlParams }): Promise<TmdbResponse> {
    const url = this.createUrl(path, params);
    // QUEST: 두 번째 then 필요성 검증
    return fetch(url)
      .then((response) => response.json())
      .then((response) => response);
  }
}

export default TmdbAPI;
