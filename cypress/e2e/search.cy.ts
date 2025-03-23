import TEST_URL from "./constants";

describe("검색 화면 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: TEST_URL.SEARCH,
      },
      { fixture: "movie-search.json" }
    ).as("getSearchMovies");

    cy.visit("http://localhost:5173");
    cy.wait(1000);
  });

  it("돋보기 클릭시 해당 제목의 영화를 검색하여 보여준다.", () => {
    cy.get(".search-bar input").focus();
    cy.get(".search-bar input").type("짱구");
    cy.get(".search-bar button").click();

    cy.wait("@getSearchMovies").then((interception) => {
      cy.get("#caption").invoke("text").should("include", "짱구");

      const searchMovies = interception.response.body.results;
      // cy.wrap(searchMovies).should("have.length", 20);
      expect(searchMovies.length).to.be.greaterThan(0);
    });
  });

  it("입력 후 엔터를 누르면 해당 제목의 영화를 검색하여 보여준다.", () => {
    cy.get(".search-bar input").focus();
    cy.get(".search-bar input").type("짱구");
    cy.get("input").type("{enter}");

    cy.wait("@getSearchMovies").then((interception) => {
      cy.get("#caption").invoke("text").should("include", "짱구");

      const searchMovies = interception.response.body.results;
      expect(searchMovies.length).to.be.greaterThan(0);
    });
  });
});

describe("검색 결과가 없는 경우", () => {
  it("검색 결과가 없으면 결과 없음을 보여준다.", () => {
    cy.visit("http://localhost:5173");
    cy.wait(1000);

    cy.get(".search-bar input").focus();
    cy.get(".search-bar input").type("dkdkdkdkadfd");
    cy.get(".search-bar button").click();

    cy.get("#caption").invoke("text").should("include", "dkdkdkdkadfd");
    cy.get(".no-result h2")
      .invoke("text")
      .should("eq", "검색 결과가 없습니다.");
  });
});

describe("오류 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: TEST_URL.SEARCH,
      },
      {
        statusCode: 500, // 오류 상태 코드
        body: "Internal Server Error", // 오류 메시지
      }
    ).as("getSearchMovies");

    cy.visit("http://localhost:5173");

    cy.wait(1000);
  });
  it("메인 화면 - 오류 발생시 오류를 보여준다.", () => {
    cy.get(".search-bar input").focus();
    cy.get(".search-bar input").type("짱구");
    cy.get(".search-bar button").click();

    cy.wait("@getSearchMovies").then((interception) => {
      cy.get(".no-result h2")
        .invoke("text")
        .should("eq", "영화 목록을 가져오는 데 실패했습니다.");
    });
  });
});
