describe("Movie List Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.wait(1000); //영화 데이터를 받아오는 시간을 위해 설정
  });

  it("초기 화면에서 20개의 영화목록을 보여주고, 더보기 버튼 클릭 시 20개의 영화 목록이 추가된다.", () => {
    cy.initMovieList();
  });

  it("영화 검색 테스트, 검색 후 더보기 버튼 동작 기능 테스트", () => {
    cy.searchMovie("해리");
  });

  it("영화 검색 테스트, 검색 후 더보기 버튼 기능 테스트", () => {
    cy.searchLessThan20Movies("듄");
  });
});
