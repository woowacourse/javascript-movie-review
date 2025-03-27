describe("API 요청 실패 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      {
        statusCode: 500,
        body: { message: "영화 정보를 불러오는 데 실패했습니다." },
      }
    ).as("getPopularMoviesError");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?query=Spiderman*/,
      },
      {
        statusCode: 500,
        body: { message: "영화 정보를 불러오는 데 실패했습니다." },
      }
    ).as("searchMoviesError");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/696506*/,
      },
      {
        statusCode: 500,
        body: { message: "영화 정보를 불러오는 데 실패했습니다." },
      }
    ).as("getMovieDetailError");

    cy.visit("http://localhost:5173");
  });

  it("인기 영화 API 호출 실패 시 alert 메시지가 표시되어야 한다", () => {
    cy.wait("@getPopularMoviesError").then((interception) => {
      expect(interception.response?.statusCode).to.equal(500);
    });

    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("영화 정보를 불러오는 데 실패했습니다.");
      return false;
    });

    cy.on("window:alert", (str) => {
      expect(str).to.equal("영화 정보를 불러오는 데 실패했습니다.");
    });
  });

  it("검색 영화 API 호출 실패 시 alert 메시지가 표시되어야 한다", () => {
    cy.get("[data-testid='search-input']").type("Spiderman");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchMoviesError").then((interception) => {
      expect(interception.response?.statusCode).to.equal(500);
    });

    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("영화 정보를 불러오는 데 실패했습니다.");
      return false;
    });

    cy.on("window:alert", (str) => {
      expect(str).to.equal("영화 정보를 불러오는 데 실패했습니다.");
    });
  });

  it("영화 상세 정보 API 호출 실패 시 alert 메시지가 표시되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.wait("@getPopularMovies").then(() => {
      cy.get("[data-testid='banner-detail-button']").click();
    });

    cy.wait("@getMovieDetailError").then((interception) => {
      expect(interception.response?.statusCode).to.equal(500);
    });

    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("영화 정보를 불러오는 데 실패했습니다.");
      return false;
    });

    cy.on("window:alert", (str) => {
      expect(str).to.equal("영화 정보를 불러오는 데 실패했습니다.");
    });
  });
});
