interface AppStateType {
  reset(): void;
  resetSearch(): void;
  getPage(): number;
  getNextPage(): number;
  getSearchValue(): string;
  getIsSearch(): boolean;
  getCurrentMovie(): string;
  increasePage(): void;
  setValue(string): void;
  setIsSearch(boolean): void;
  setCurrentMovie(string): void;
}
