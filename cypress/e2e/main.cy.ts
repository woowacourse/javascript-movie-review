describe("메인 페이지", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("인기 영화 20개를 로드한다", () => {
    cy.get(".item").should("have.length", 20);
  });

  it("영화 목록을 불러오는 동안 스켈레톤을 표시한다", () => {
    cy.visit("/");
    cy.get(".skeleton-box").should("exist");
    cy.get(".item").should("have.length", 20);
    cy.get(".skeleton-box").should("not.exist");
  });

  it("더보기 버튼 클릭 시 20개가 추가 로드된다", () => {
    cy.get(".item").should("have.length", 20);
    cy.contains("button", "더 보기").click();
    cy.get(".item").should("have.length", 40);
  });

  it("데이터를 불러오지 못했을 때 에러 메시지를 표시한다", () => {
    cy.intercept("GET", "**/movie/popular**", { forceNetworkError: true }).as("networkError");

    cy.visit("/");
    cy.wait("@networkError");
    cy.contains("데이터를 불러오지 못했습니다.").should("be.visible");
  });

  it("더보기 버튼이 마지막 페이지에서 숨겨진다", () => {
    cy.intercept("GET", "**/movie/popular**", (req) => {
      req.reply({
        results: Array.from({ length: 20 }, (_, i) => ({
          id: i,
          title: `영화 ${i}`,
          poster_path: null,
          vote_average: 7.0,
        })),
        page: 1,
        total_pages: 1,
      });
    }).as("lastPage");

    cy.visit("/");
    cy.wait("@lastPage");
    cy.contains("button", "더 보기").should("not.be.visible");
  });
});
