export interface MovieData {
    adult: boolean;
    backdrop_path: null | string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null | string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  

export interface MovieState {
  title?:string;
  eventName?:string;
  isPossibleMore?:boolean;
  movieData?:MovieData[];
}

export interface MovieLayout {
  setState(newState:MovieState): void;
  render(): void;
  template(): string;
  newMovieListRender(dataList: MovieData[]): void;
}
  