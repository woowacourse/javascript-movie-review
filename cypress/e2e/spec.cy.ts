describe("영화 리뷰 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });
  describe("인기 있는 영화가 정상적으로 보여진다.", async () => {
    it("처음 페이지에 접속하면 20개의 영화 목록이 보인다.", () => {
      cy.get(".item").should("have.length", 20);
    });

    it("더보기 버튼을 누르면 20개의 영화가 추가된다.", () => {
      cy.get(".add-more-button").click();
      cy.get(".item").should("have.length", 40);
    });
  });
  describe("특정 키워드로 영화 검색을 하면 해당 영화들이 보여진다.", () => {
    it("검색 키워드를 입력하면 관련 영화가 최대 20개 보인다.", () => {
      cy.get("#search-input").type("spider");
      cy.get(".search-button").click();
      cy.get(".item").should("have.length", 20);
    });

    it("검색 결과가 없으면 해당 관련 UI를 보여준다.", () => {
      cy.get("#search-input").type("크하하하");
      cy.get(".search-button").click();
      cy.get(".empty-search-result-container").should("exist");
    });
  });

  describe("스켈레톤 UI 테스트", () => {
    it("api 요청이 완료되기 전에는 스켈레톤 UI가 보인다.", () => {
      cy.get(".skeleton-item").should("exist");
    });
  });

  describe("영화 API 테스트", () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api.themoviedb.org\/3\/tv\/popular*/,
        },
        {
          fixture: "movie-popular.json",
        }
      ).as("getPopularMovies");

      cy.visit("localhost:5173");
    });

    it("영화 API를 통해 영화 목록을 받아온다.", () => {
      cy.wait("@getPopularMovies").then((interception) => {
        const popularMovies = interception.response.body.results;
        expect(popularMovies.length).to.equal(20);
      });
    });
  });
});

describe("api 요청에 실패하면 에러 페이지가 나온다.", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/tv\/popular*/,
      },
      {
        statusCode: 404,
      }
    ).as("getPopularMoviesError");

    cy.visit("localhost:5173");
  });

  it("영화 API 요청에 실패하면 에러 페이지가 보인다.", () => {
    cy.wait("@getPopularMoviesError").then(() => {
      cy.get(".error-page-container").should("exist");
    });
  });
});
