export interface Movie {
  list: string[];
  query: string;
  currentPage: number;
  totalPages: number;
}

export interface MoveItem {
  src: string;
  title: string;
  score: number;
}
