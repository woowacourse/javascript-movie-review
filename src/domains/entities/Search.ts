export default class Search {
  private static instance: Search;
  private _searchKeyword: string = "";

  static getInstance(): Search {
    if (!Search.instance) Search.instance = new Search();
    return Search.instance;
  }

  get searchKeyword(): string {
    return this._searchKeyword;
  }

  updateSearchKeyword(searchKeyword: string) {
    this._searchKeyword = searchKeyword;
  }

  hasSearchKeyword() {
    return this._searchKeyword !== "";
  }
}
