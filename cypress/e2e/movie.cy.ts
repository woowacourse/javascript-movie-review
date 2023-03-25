describe("정상 작동 기능 테스트", () => {
  const apiKey = Cypress.env("CYPRESS_API_KEY");
  const localhostUrl = "http://localhost:8080/";
  const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;

  beforeEach(() => {
    cy.visit(localhostUrl);
  });

  it("영화 목록을 인기 순으로 1페이지를 불러 올 수 있다", () => {
    cy.request("GET", popularMovieUrl).as("moviePopular");

    cy.get("@moviePopular").its("status").should("eq", 200);
    cy.get("@moviePopular").its("body.results").should("have.length", 20);
  });

  it("영화 목록 아이템에 대한 Skeleton UI를 띄운다.", () => {
    cy.intercept("GET", popularMovieUrl).as("moviePopular");

    cy.get(".skeleton").should("be.visible");
  });

  it("검색를 포함하고 있는 영화를 검색할 수 있다", () => {
    cy.get("#search-input").type("무서운 영화");
    cy.get("#search-form").submit();

    cy.get("movie-item").should("have.length", 5);
  });
});

describe("데이터 값이 없을 때 테스트", () => {
  const localhostUrl = "http://localhost:8080/";

  beforeEach(() => {
    cy.visit(localhostUrl);
  });

  it("포스터가 없을 때 대체 이미지가 출력된다", () => {
    cy.get("#search-input").type("쿠키 커피 도시락");
    cy.get("#search-form").submit();

    cy.get(".item-card")
      .find(".item-thumbnail")
      .should("have.attr", "src", `${localhostUrl}da3e03a95b7922e70c82.png`);
  });

  it("검색어가 없을 때 안내 메세지가 출력된다", () => {
    cy.get("#search-input").type("고구마");
    cy.get("#search-form").submit();

    cy.get(".not-search").should("contain.text", "해당 검색 결과가 없습니다");
  });
});
