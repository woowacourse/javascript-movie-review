describe("무한 스크롤", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular**", (req) => {
      const url = new URL(req.url);
      const page = Number(url.searchParams.get("page")) || 1;
      req.reply({
        results: Array.from({ length: 20 }, (_, i) => ({
          id: (page - 1) * 20 + i + 1,
          title: `영화 ${(page - 1) * 20 + i + 1}`,
          poster_path: null,
          vote_average: 7.0,
        })),
        page,
        total_pages: 3,
      });
    }).as("popularMovies");

    cy.visit("/");
    cy.wait("@popularMovies");
  });

  it("스크롤 하단 도달 시 다음 페이지가 로드된다", () => {
    cy.get(".item").should("have.length", 20);
    cy.scrollTo("bottom");
    cy.wait("@popularMovies");
    cy.get(".item").should("have.length", 40);
  });

  it("마지막 페이지 도달 시 더 이상 로드되지 않는다", () => {
    cy.scrollTo("bottom");
    cy.wait("@popularMovies");
    cy.scrollTo("bottom");
    cy.wait("@popularMovies");
    cy.get(".item").should("have.length", 60);
    cy.scrollTo("bottom");
    cy.get(".item").should("have.length", 60);
  });

  it("검색 페이지에서도 무한 스크롤이 동작한다", () => {
    cy.intercept("GET", "**/search/movie**", (req) => {
      const url = new URL(req.url);
      const page = Number(url.searchParams.get("page")) || 1;
      req.reply({
        results: Array.from({ length: 20 }, (_, i) => ({
          id: (page - 1) * 20 + i + 1,
          title: `검색결과 ${(page - 1) * 20 + i + 1}`,
          poster_path: null,
          vote_average: 7.0,
        })),
        page,
        total_pages: 3,
      });
    }).as("searchMovies");

    cy.visit(`/search?query=${encodeURIComponent("영화")}`);
    cy.wait("@searchMovies");
    cy.get(".item").should("have.length", 20);
    cy.scrollTo("bottom");
    cy.wait("@searchMovies");
    cy.get(".item").should("have.length", 40);
  });
});
