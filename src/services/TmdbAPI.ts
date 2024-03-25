if (!process.env.TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined');
}

class TmdbAPI {
  public static IMG_URL = 'https://image.tmdb.org/t/p/w500' as const;

  /* TMDB API 공식문서에 따라 그룹화 */
  public static PATH = {
    popular: 'movie/popular',
    search: 'search/movie'
  } as const;

  private static apiKey = process.env.TMDB_API_KEY!;
  private static domain = 'https://api.themoviedb.org/3';
  private static language = 'ko-KR';

  private static createUrl({ path, page, query }: TmdbUrlParams): string {
    const params = new URLSearchParams({ api_key: this.apiKey, language: this.language, page });

    if (query) params.append('query', query);

    return `${this.domain}/${path}?${params}`;
  }

  public static fetch(params: TmdbUrlParams): Promise<TmdbResponse> {
    const url = this.createUrl(params);
    return fetch(url).then((response) => response.json());
  }
}

export default TmdbAPI;
