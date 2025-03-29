import { createIntercept } from "../utils/createIntercept";

describe("영화 상세보기 모달 테스트", () => {
  beforeEach(() => {
    createIntercept({
      id: "getPopularMovieList",
      url: "^https://api.themoviedb.org/3/movie/popular*",
      delay: 1000,
      staticResponse: { fixture: "popularMovieData.json" },
    });

    createIntercept({
      id: "getMovieDetail",
      url: "^https://api.themoviedb.org/3/movie/[0-9]+.*$",
      delay: 1000,
      staticResponse: { fixture: "detailMovieData.json" },
    });

    cy.visit("http://localhost:5173/");
  });

  it("영화 상세보기 모달 열기, 콘텐츠 로드, 모달 닫기 테스트", () => {
    cy.get(".skeleton-list").should("exist");

    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(20);

      cy.get(".skeleton-list").should("not.exist");
      cy.get(".item").should("have.length", 20);
    });

    const movieTitle = "일렉트릭 스테이트";
    cy.get(".item").first().find(".movie-title").should("contain", movieTitle);
    cy.get(".item").first().click();

    cy.get(".skeleton-detail-movie").should("exist");

    cy.wait("@getMovieDetail").then((interception) => {
      const movieDetail = interception.response?.body;
      expect(movieDetail).to.be.an("object");

      cy.get(".skeleton-detail-movie").should("not.exist");
      cy.get(".detail-movie").should("exist");
      cy.get(".detail-movie-title").should("contain", movieTitle);
    });

    cy.get(".close-modal").should("exist");
    cy.get(".close-modal").click();
    cy.get(".detail-movie").should("not.be.visible");
  });

  describe("영화 상세보기 모달 에러 테스트", () => {
    beforeEach(() => {
      createIntercept({
        id: "getMovieDetail",
        url: "^https://api.themoviedb.org/3/movie/[0-9]+.*$",
        delay: 1000,
        staticResponse: {
          statusCode: 501,
          body: {
            status_code: 2,
            status_message: "Invalid service: this service does not exist.",
            success: false,
          },
        },
      });

      cy.visit("http://localhost:5173/");
    });

    it("영화 상세보기 모달 열기, 에러 컴포넌트 렌더링 테스트", () => {
      cy.get(".skeleton-list").should("exist");

      cy.wait("@getPopularMovieList").then((interception) => {
        const popularMovieList = interception.response?.body.results;
        console.log(popularMovieList);
        expect(popularMovieList.length).to.equal(20);

        cy.get(".skeleton-list").should("not.exist");
        cy.get(".item").should("have.length", 20);
      });

      const movieTitle = "일렉트릭 스테이트";
      cy.get(".item")
        .first()
        .find(".movie-title")
        .should("contain", movieTitle);
      cy.get(".item").first().click();

      cy.get(".skeleton-detail-movie").should("exist");

      cy.wait("@getMovieDetail").then((interception) => {
        const movieDetail = interception.response?.body;
        expect(movieDetail).to.be.an("object");

        cy.get(".skeleton-detail-movie").should("not.exist");
        cy.get(".error-box").should("exist");
      });
    });
  });
});
