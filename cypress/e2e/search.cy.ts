import { SEARCH_QUERIES } from "../constants/searchConstants";

describe("검색 데이터 있을 때 테스트", () => {
  beforeEach("검색어를 입력하고 검색 버튼을 클릭한다.", () => {
    cy.mockSearchMovies(SEARCH_QUERIES.valid, 1, 'searchResults.json');
    cy.visit("/");
    cy.performSearch(SEARCH_QUERIES.valid);
  });

  it("검색 버튼을 클릭하면 API가 호출된다", () => {
    cy.wait("@searchMovies1")
      .its("response.body.results")
      .should("be.an", "array");
  });

  it("리스트 안의 요소를 확인한다.", () => {
    cy.wait("@searchMovies1")
      .its("response.body.results")
      .then((results) => {
        cy.verifyMovieItems(results);
      });
  });
});

describe("검색 데이터 없을 때 테스트", () => {
  beforeEach("검색어를 입력하고 검색 버튼을 클릭한다.", () => {
    cy.mockSearchMovies(SEARCH_QUERIES.invalid,1, 'nonSearchResults.json');
    cy.visit("/");
    cy.performSearch(SEARCH_QUERIES.invalid);
  });

  it("검색 데이터가 없으면 '검색 결과가 없습니다.'라는 문구를 띄운다.", () => {
    cy.get(".empty-message")
      .should("exist")
      .and("contain", "검색 결과가 없습니다.");
  });
});

describe("무한 스크롤 테스트", () => {
  beforeEach("검색어를 입력하고 검색 버튼을 클릭한다.", () => {
    cy.mockSearchMovies("바보", 1, 'multipleSearchResults1.json');
    cy.mockSearchMovies("바보", 2, 'multipleSearchResults2.json');
    cy.visit("/");
    cy.performSearch("바보");
  });

  it("검색 버튼을 클릭하면 API가 호출된다", () => {
    cy.wait("@searchMovies1")
      .its("response.body.results")
      .should("be.an", "array");
  });

  it("스크롤 시 추가 api를 받아오는지 확인한다.", () => {
    cy.wait("@searchMovies1");
    cy.get(".thumbnail-list li:last-child").scrollIntoView();
    cy.get("@searchMovies2").its("response.body.results").should("be.an", "array");
  });
})
