describe("사용자의 영화 탐색 및 검색 시나리오", () => {
  beforeEach(() => {
    cy.setupMovieListTest({ wait: true });
  });

  describe("사용자가 인기 영화를 둘러보는 시나리오", () => {
    it("처음 사이트에 방문했을 때 인기 영화 목록을 확인한다.", () => {
      cy.verifyMovieListLength(20);
    });

    it("더 많은 영화를 보기 위해 페이지를 아래로 스크롤 한다.", () => {
      cy.verifyMovieListLength(20);
      cy.scrollTo("bottom");
      cy.verifyMovieListLength(40);
    });
  });

  describe("사용자가 특정 영화를 찾는 시나리오", () => {
    it("보고 싶은 영화를 검색창에 입력하여 찾는다.", () => {
      cy.search("짱구");
      cy.verifyMovieListLength(20);
    });

    it("존재하지 않는 영화를 검색한 경우 검색 결과 없음을 확인한다.", () => {
      cy.search("없는제목우아아아아아아");

      cy.get(".error").should("be.visible");
      cy.get(".error").contains("검색 결과가 없습니다.");

      cy.get(".top-rated-search-input").should("be.visible");
    });
  });
});
