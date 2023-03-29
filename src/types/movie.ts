export interface Movie {
  list: string;
  query: FormDataEntryValue;
  currentPage: number;
  totalPages: number;
}

export interface MoveItem {
  id: number;
  src: string;
  title: string;
  score: number;
}

export interface MovieDetail {
  id: string;
  title: string;
  src: string;
  score: number;
  genre: string[];
  overview: string;
}
