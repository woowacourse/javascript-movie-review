class PageNumberManager {
  private pageNumberList: Map<string, number>;

  constructor() {
    this.pageNumberList = new Map();
  }

  add(pageName: string) {
    const currentPage = this.pageNumberList.get(pageName) ?? 0;

    this.pageNumberList.set(pageName, currentPage + 1);
  }

  clear(pageName: string) {
    if (this.pageNumberList.has(pageName)) this.pageNumberList.set(pageName, 1);
  }

  get(pageName: string) {
    if (this.pageNumberList.has(pageName)) return this.pageNumberList.get(pageName);
  }

  init(pageName: string) {
    this.pageNumberList.set(pageName, 1);
  }
}

export default PageNumberManager;
