class TMDBApi {
  isLoading: boolean;

  error: Error | null;

  activeHttpRequests: AbortController[] = [];

  onLoadingChanged: (isLoading: boolean) => void;

  onErrorChanged: (error: Error | null) => void;

  constructor() {
    this.isLoading = false;
    this.error = null;
    this.activeHttpRequests = [];
    this.onLoadingChanged = () => {};
    this.onErrorChanged = () => {};
  }

  async sendRequest(url: string, method = 'GET', body = null, headers = {}) {
    this.setLoading(true);
    const httpAbortCtrl = new AbortController();
    if (httpAbortCtrl instanceof AbortController) {
      this.activeHttpRequests.push(httpAbortCtrl);
    }

    try {
      const res = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      this.activeHttpRequests = this.activeHttpRequests.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

      if (!res.ok) {
        throw new Error('에러 발생!');
      }

      this.setLoading(false);
      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        this.setError(err);
        this.setLoading(false);
        throw err;
      }
    }
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.onLoadingChanged(isLoading);
  }

  setError(error: Error) {
    this.error = error;
    this.onErrorChanged(error);
  }

  clearError() {
    this.error = null;
    this.onErrorChanged(null);
  }

  cleanup() {
    this.activeHttpRequests.forEach((abortCtrl) => abortCtrl.abort());
  }
}

const tmdbApi = new TMDBApi();

export default tmdbApi;
