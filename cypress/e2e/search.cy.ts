const mockMovieResponse = (
  count: number,
  titlePrefix: string,
  page: number,
  totalPages: number,
) => ({
  results: Array.from({ length: count }, (_, i) => ({
    id: i + (page - 1) * 20 + 1,
    title: `${titlePrefix} ${i + (page - 1) * 20 + 1}`,
    poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
    vote_average: 7.5,
  })),
  page,
  total_pages: totalPages,
});

const mockSearchMovieDetail = {
  id: 1,
  title: "인사이드 아웃 1",
  overview: "줄거리",
  vote_average: 7.5,
  poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
  release_date: "2015-06-10",
  genres: [{ name: "애니메이션" }],
};

const searchMovie = (query: string) => {
  cy.get(".search-input").type(query);
  cy.get(".search").submit();
};

describe("검색 시나리오 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "**/movie/popular*",
      mockMovieResponse(20, "인기 영화", 1, 5),
    );
    cy.intercept(
      "GET",
      "**/search/movie?*query=%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C*page=1*",
      mockMovieResponse(20, "인사이드", 1, 2),
    ).as("searchP1");
    cy.intercept(
      "GET",
      "**/search/movie?*query=%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C*page=2*",
      mockMovieResponse(10, "인사이드", 2, 2),
    ).as("searchP2");
    cy.intercept("GET", "**/search/movie?*query=notfound*", {
      results: [],
      page: 1,
      total_pages: 0,
    }).as("searchEmpty");

    cy.visit("http://localhost:5173/");
  });

  it('1. "인사이드"를 검색하면 관련 영화가 최대 20개 표시된다.', () => {
    searchMovie("인사이드");
    cy.wait("@searchP1");

    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.get(".thumbnail-list li").each(($el) => {
      cy.wrap($el).find("strong").should("contain.text", "인사이드");
    });
  });

  it("2. 스크롤을 내리면 다음 검색 결과 10개가 자동으로 추가된다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchP1");

    cy.scrollTo("bottom");
    cy.wait("@searchP2");

    cy.get(".thumbnail-list li").should("have.length", 30);
  });

  it("3. 마지막 페이지까지 불러오면 더 이상 요청이 발생하지 않는다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchP1");

    cy.scrollTo("bottom");
    cy.wait("@searchP2");

    // 마지막 페이지 이후 스크롤해도 아이템 수가 유지된다
    cy.scrollTo("bottom");
    cy.get(".thumbnail-list li").should("have.length", 30);
  });

  it("4. 검색 결과가 없으면 안내 메시지를 아이콘과 함께 표시된다.", () => {
    searchMovie("notfound");
    cy.wait("@searchEmpty");

    cy.get(".not-search-found-container").should("be.visible");
    cy.get(".not-search-found-text").should(
      "contain.text",
      "검색 결과가 없습니다.",
    );
    cy.get(".not-search-found-img").should("be.visible");
  });

  it("5. 로고를 누르면 메인 화면으로 돌아온다.", () => {
    searchMovie("인사이드");
    cy.wait("@searchP1");

    cy.get(".logo").click();

    cy.get(".background-container").should("be.visible");
    cy.get(".section-title").should("contain.text", "지금 인기 있는 영화");
  });

  describe("6. 검색 결과에서 영화를 클릭하면 모달이 열린다.", () => {
    beforeEach(() => {
      searchMovie("인사이드");
      cy.wait("@searchP1");
      cy.intercept(
        "GET",
        "**/movie/*?language=ko-KR",
        mockSearchMovieDetail,
      ).as("getDetail");
      cy.get(".thumbnail-list .item").first().click();
      cy.wait("@getDetail");
    });

    it("모달에 영화 정보가 올바르게 표시된다.", () => {
      cy.get(".modal-background").should("have.class", "active");
      cy.get(".modal-header h2").should(
        "have.text",
        mockSearchMovieDetail.title,
      );
    });

    it("모달을 닫고 검색 결과 화면으로 돌아올 수 있다.", () => {
      cy.get(".close-modal").click();

      cy.get(".modal-background").should("not.have.class", "active");
      cy.get(".thumbnail-list li").should("have.length", 20);
    });
  });
});
