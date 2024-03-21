import { getPopularURL, getSearchURL } from "../utils/createURL";

describe("더보기 버튼 테스트", () => {
  describe("인기 영화 리스트안의 더보기 버튼 테스트", () => {
    it("인기 영화 리스트에서 더보기 버튼을 눌렀을 경우,인기 영화 리스트에 20개 이하의 영화가 추가된다.", () => {
      // 비동기 fetch
      cy.intercept(
        {
          method: "GET",
          url: getPopularURL(1),
        },
        { fixture: "movie-popular-page1.json" },
      ).as("getPopularMovies1");

      cy.intercept(
        {
          method: "GET",
          url: getPopularURL(2),
        },
        { fixture: "movie-popular-page2.json" },
      ).as("getPopularMovies2");

      cy.visitMainPage();

      cy.wait("@getPopularMovies1").then((intercept) => {
        cy.get("#more-button").click();
        cy.wait("@getPopularMovies2").then((intercept) => {
          cy.get(".item-view").within(() => {
            cy.get(".item-list").then(($elements) => {
              expect($elements.length).to.be.at.most(40);
            });
          });
        });
      });
    });

    it("인기 영화 리스트에서 더보기 버튼을 눌렀을 경우, 더 이상 불러온 영화 데이터가 없으면 더보기 버튼은 사라진다.", () => {
      // 비동기 fetch
      cy.intercept(
        {
          method: "GET",
          url: getPopularURL(1),
        },
        { fixture: "movie-popular-page1.json" },
      ).as("getPopularMovies1");

      cy.intercept(
        {
          method: "GET",
          url: getPopularURL(2),
        },
        { fixture: "movie-popular-last-page.json" },
      ).as("getPopularMoviesLast");

      cy.visitMainPage();

      cy.wait("@getPopularMovies1").then((intercept) => {
        cy.get("#more-button").click();

        cy.wait("@getPopularMoviesLast").then((intercept) => {
          cy.get(".item-view").within(() => {
            cy.get("#more-button").should("not.be.visible");
          });
        });
      });
    });
  });

  describe("영화 검색 리스트안의 더보기 버튼 테스트", () => {
    it("영화 검색 리스트에서 더보기 버튼을 눌렀을 경우, 영화 검색 리스트에 20개 이하의 영화가 추가된다.", () => {
      // 비동기 fetch
      // 처음 렌더링을 위한 api
      cy.intercept(
        {
          method: "GET",
          url: getPopularURL(1),
        },
        { fixture: "movie-popular-page1.json" },
      ).as("getPopularMovies");

      // 검색
      cy.intercept(
        {
          method: "GET",
          url: getSearchURL(1),
        },
        { fixture: "movie-search-page1.json" },
      ).as("getSearchMovies1");
      cy.intercept(
        {
          method: "GET",
          url: getSearchURL(2),
        },
        { fixture: "movie-search-page2.json" },
      ).as("getSearchMovies2");

      cy.visitMainPage();

      cy.wait("@getPopularMovies").then((intercept) => {
        // 검색
        const TITLE = "행복";
        cy.get("#search-input").type(TITLE);
        cy.get(".search-button").click();

        cy.wait("@getSearchMovies1").then((intercept) => {
          cy.get("#more-button").click();

          cy.wait("@getSearchMovies2").then((intercept) => {
            cy.get(".item-view").within(() => {
              cy.get(".item-list").then(($elements) => {
                expect($elements.length).to.be.at.most(40);
              });
            });
          });
        });
      });
    });

    it("영화 검색 리스트에서 더보기 버튼을 눌렀을 경우, 더 이상 불러온 영화 데이터가 없으면 더보기 버튼은 사라진다.", () => {
      // 비동기 fetch
      // 처음 렌더링을 위한 api
      cy.intercept(
        {
          method: "GET",
          url: getPopularURL(1),
        },
        { fixture: "movie-popular-page1.json" },
      ).as("getPopularMovies");
      // 검색 api
      cy.intercept(
        {
          method: "GET",
          url: getSearchURL(1),
        },
        { fixture: "movie-search-page1.json" },
      ).as("getSearchMovie1");
      cy.intercept(
        {
          method: "GET",
          url: getSearchURL(2),
        },
        { fixture: "movie-search-last-page.json" },
      ).as("getSearchMoviesLast");

      cy.visitMainPage();
      //검색

      cy.wait("@getPopularMovies").then((intercept) => {
        const TITLE = "행복";
        cy.get("#search-input").type(TITLE);
        cy.get(".search-button").click();

        cy.wait("@getSearchMovie1").then((intercept) => {
          cy.get("#more-button").click();
          //확인
          cy.wait("@getSearchMoviesLast").then((intercept) => {
            cy.get("#more-button").should("not.be.visible");
          });
        });
      });
    });
  });
});
