export interface Movie {
  list: string[];
  query: string;
  currentPage: number;
  totalPages: number;
  isClicked: boolean;
}

export interface MoveItem {
  src: string;
  title: string;
  score: number;
}
