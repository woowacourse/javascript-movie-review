const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

type Options = {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
};

export const defaultOptions: Options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
};

const http = {
  request: (apiUrl: string, options: Options) => {
    return fetch(apiUrl, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      throw error;
    });
  },
  get: (url: string) => {
    return http.request(url, defaultOptions);
  }
}

export default http;
