export interface IMovieData {
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

  

export interface IMovieState {
  title?:string;
  eventName?:string;
  isPossibleMore?:boolean;
  movieData?:IMovieData[];
}

export interface IMovieLayout {
  setState(newState:IMovieState): void;
  render(): void;
  template(): string;
  newMovieListRender(dataList: IMovieData[]): void;
}
  