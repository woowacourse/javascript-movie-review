describe("영화 리뷰 애플리케이션 지금 인기있는 영화 및 검색 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("localhost:8080");

    cy.wait("@getPopularMovies");
  });

  it("하단부로 내리면 누르면 영화 데이터 20개를 추가로 받아서 렌더링 해야 한다.", () => {
    cy.get(".item-card:not(.skeleton)").should("have.length", 20);

    cy.document().then((document) => {
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
    });

    cy.wait(1000);
    cy.get(".item-card:not(.skeleton)").should("have.length", 40);
  });

  it("검색창에 '해리포터'를 검색하면 해리포터 시리즈 영화 8개가 존재해야 한다.", () => {
    cy.get(".search-input").type("해리포터");
    cy.get(".search-box").submit();

    cy.get(".item-card:not(.skeleton)").should("have.length", 8);
  });

  it("검색창에 '해리포터'를 검색하면 상단에 '해리포터 검색결과' 문구가 존재해야 한다.", () => {
    cy.get(".search-input").type("해리포터");
    cy.get(".search-box").submit();

    cy.get(".search-title").should("contain", '"해리포터" 검색결과');
  });

  it("검색 되지 않는 영화를 검색 할 경우 검색 결과가 없다는 메시지가 출력되어야 한다.", () => {
    cy.get(".search-input").type("해리포터10");
    cy.get(".search-box").submit();

    cy.get(".search-title").should("contain", '"해리포터10"에 대한 검색 결과가 없습니다 :(');
  });
});
