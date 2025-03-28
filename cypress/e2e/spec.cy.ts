describe("E2E테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular**").as(
      "getMovies"
    );
    cy.visit("http://localhost:5173/");
    cy.wait("@getMovies");
  });

  describe("목록", () => {
    it("사용자가 영화 목록 20개를 볼 수 있다.", () => {
      cy.get(".thumbnail-list > li").should("have.length", 20);
    });

    it("사용자가 스크롤을 내려서 하단에 도달한 경우 다음 영화 페이지 목록을 보여준다.", () => {
      // TODO: 무한 스크롤로 수정
      cy.get(".thumbnail-list > li").should("have.length", 40);
    });
  });

  describe("검색", () => {
    it("검색어를 입력했을 때 검색 결과가 있다면 목록을 보여준다.", () => {
      cy.search("짱구");
      cy.get(".thumbnail-list > li").should("have.length", 20);
    });
    it("검색어를 입력했을 때 검색 결과가 없다면 빈 화면을 보여준다.", () => {
      cy.search("없는제목우아아아아아아");
      cy.get(".error").contains("검색 결과가 없습니다.").should("exist");
    });
  });
});
