import { SEARCH_QUERIES } from "../constants/searchConstants";

describe("검색 데이터 있을 때 테스트", () => {
  beforeEach("검색어를 입력하고 검색 버튼을 클릭한다.", () => {
    cy.mockSearchMovies(SEARCH_QUERIES.valid, 'searchResults.json');
    cy.visit("/");
    cy.performSearch(SEARCH_QUERIES.valid);
  });

  it("검색 버튼을 클릭하면 API가 호출된다", () => {
    cy.wait("@searchMovies")
      .its("response.body.results")
      .should("be.an", "array");
  });

  it("리스트 안의 요소를 확인한다.", () => {
    cy.wait("@searchMovies")
      .its("response.body.results")
      .then((results) => {
        cy.get(".thumbnail").each(($el, index) => {
          cy.wrap($el)
            .should("have.attr", "src")
            .and("include", results[index].poster_path);
        });

        cy.get(".item-rate").each(($el, index) => {
          cy.wrap($el).should("contain", results[index].vote_average);
        });

        cy.get(".item-title").each(($el, index) => {
          cy.wrap($el).should("contain", results[index].title);
        });
      });
  });
});

describe("검색 데이터 없을 때 테스트", () => {
  beforeEach("검색어를 입력하고 검색 버튼을 클릭한다.", () => {
    cy.mockSearchMovies(SEARCH_QUERIES.invalid, 'nonSearchResults.json');
    cy.visit("/");
    cy.performSearch(SEARCH_QUERIES.invalid);
  });

  it("검색 데이터가 없으면 '검색 결과가 없습니다.'라는 문구를 띄운다.", () => {
    cy.get(".empty-message")
      .should("exist")
      .and("contain", "검색 결과가 없습니다.");
  });
});

describe("검색 데이터가 전부 출력되었을 때 더보기 버튼 사라지는 테스트", () => {
  beforeEach("검색어를 입력하고 검색 버튼을 클릭한다.", () => {
    cy.mockSearchMovies(SEARCH_QUERIES.valid, 'searchResults.json');
    cy.visit("/");
    cy.performSearch(SEARCH_QUERIES.valid);
  });

  it("검색 데이터가 마지막 데이터면 더보기 버튼이 사라진다.", () => {
    cy.wait("@searchMovies")
      .its("response.body")
      .then((data) => {
        expect(data.page).to.equal(data.total_pages)
        cy.get(".thumbnail-add-button").should("not.be.visible");
      })
  });
});
