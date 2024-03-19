class MovieClient {
  private BASE_URL: string;

  constructor(baseUrl: string) {
    this.BASE_URL = baseUrl;
  }

  public fetch(endPoint: string, options = {}) {
    return fetch(`${this.BASE_URL}/${endPoint}`, {
      ...options,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
  }
}

export default MovieClient;
