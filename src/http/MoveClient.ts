import { BASE_URL } from "../constants/movies";

export const getMovies = async (endPoint: string, options = {}) => {
  return fetch(`${BASE_URL}/${endPoint}`, {
    ...options,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
};

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

export default new MovieClient(BASE_URL);

// const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error("error:" + err));
