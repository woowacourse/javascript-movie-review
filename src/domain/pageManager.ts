const START_PAGE = 1; // 처음에 여러 페이지를 로드해두고 있어야 할 수도 있으므로
const PAGE_UNIT = 1;

class PageManager {
  private name: string;
  private page: number;

  constructor() {
    this.name = 'popular';
    this.page = START_PAGE;
  }

  getPage() {
    return this.page;
  }

  getPageName() {
    return this.name;
  }

  // 페이지를 변경하면 페이지 넘버도 초기화되는 부가 효과가 있다.
  changePage(name: string) {
    this.name = name;
    this.page = START_PAGE;
  }

  addPage() {
    this.page += PAGE_UNIT;
  }
}

export default PageManager;
