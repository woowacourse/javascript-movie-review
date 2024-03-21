import { getPopularURL, getSearchURL } from "../utils/createURL";

describe("검색창 테스트", () => {
  it("검색창에 영화 제목을 입력 후 '검색 아이콘 클릭'하면 검색 데이터가 나온다.", () => {
    cy.intercept(
      {
        method: "GET",
        url: getPopularURL(1),
      },
      { fixture: "movie-popular-page1.json" },
    ).as("getPopularMovies1");
    // 검색
    cy.intercept(
      {
        method: "GET",
        url: getSearchURL(1),
      },
      { fixture: "movie-search-page1.json" },
    ).as("getSearchMovies1");

    cy.visitMainPage();

    // API 호출
    cy.wait("@getPopularMovies1").then((intercept) => {
      const TITLE = "행복";
      cy.get("#search-input").type(TITLE);
      cy.get(".search-button").click();

      cy.wait("@getSearchMovies1").then((intercept) => {
        cy.get(".item-view").within(() => {
          cy.get("h2").should("contain.text", TITLE);
        });
      });
    });
  });
  // TODO: 엔터 누르는 이벤트가 cypress 에 적용 되지 않음
  it.skip("검색창에 영화 제목을 입력 후 '엔터를 누르면' 검색 데이터가 나온다.", () => {
    cy.intercept(
      {
        method: "GET",
        url: getPopularURL(1),
      },
      { fixture: "movie-popular-page1.json" },
    ).as("getPopularMovies1");
    // 검색
    cy.intercept(
      {
        method: "GET",
        url: getSearchURL(1),
      },
      { fixture: "movie-search-page1.json" },
    ).as("getSearchMovies1");

    cy.visit("http://localhost:8080/");

    // API 호출
    cy.wait("@getPopularMovies1").then((intercept) => {
      const TITLE = "행복";
      cy.get("#search-input").type(TITLE).type("{enter}");

      cy.wait("@getSearchMovies1").then((intercept) => {
        cy.get(".item-view").within(() => {
          cy.get("h2").should("contain.text", TITLE);
        });
      });
    });
  });
});
