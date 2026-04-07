describe("검색", () => {
  it("검색어 입력 후 결과를 표시한다", () => {
    cy.visit("/");
    cy.get(".search-input").type("인터스텔라");
    cy.get(".search-form").submit();
    cy.url().should("include", "/search?query=");
    cy.get(".item").should("have.length.greaterThan", 0);
  });

  it("URL로 직접 검색 결과에 접근할 수 있다", () => {
    cy.visit(`/search?query=${encodeURIComponent("인터스텔라")}`);
    cy.get(".item").should("have.length.greaterThan", 0);
  });

  it("검색 결과가 없을 때 empty 상태를 표시한다", () => {
    cy.visit("/search?query=zzzzzzzzzzzzzzzzzzz");
    cy.get(".empty").should("exist");
    cy.contains("검색 결과가 없습니다.").should("be.visible");
  });

  it("검색 결과가 없을 때 그리드 레이아웃이 적용되지 않는다", () => {
    cy.visit("/search?query=zzzzzzzzzzzzzzzzzzz");
    cy.get(".movie-list-empty").should("exist");
    cy.get(".movie-list").should("not.exist");
  });

  it("포스터가 없는 영화는 fallback을 표시한다", () => {
    cy.intercept("GET", "**/search/movie**", (req) => {
      req.reply({
        results: [
          {
            id: 1,
            title: "포스터없는영화",
            poster_path: null,
            vote_average: 7.0,
          },
        ],
        page: 1,
        total_pages: 1,
      });
    }).as("searchWithNoPoster");

    cy.visit(`/search?query=${encodeURIComponent("포스터없는영화")}`);
    cy.wait("@searchWithNoPoster");
    cy.get(".thumbnail-fallback").should("exist");
    cy.get(".thumbnail-fallback").should("contain.text", "포스터없는영화");
  });
});
