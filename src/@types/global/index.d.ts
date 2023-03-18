declare module "*.png" {
  const value: string;
  export default value;
}

declare module customElements{

}

type movieList = movieInfo[];

interface appState {
  page: number;
  listState: "popular" | "searched";
  movieList: movieList;
  movieName: string;
}

interface movieInfo {
  title: string;
  poster: string;
  rating: string;
  movieId: string;
}

interface fetchedData {
  title: string;
  poster_path: string;
  vote_average: string;
  id: string;
}
