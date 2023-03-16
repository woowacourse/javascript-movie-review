import { getPopularMovie } from "../../src/api/movieList";

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("display", () => {
    cy.get(".item-card").should("have.length", 20);
  });

  it("moreButton", () => {
    cy.get(".item-card").should("have.length", 20);
    cy.get(".primary").click();
    cy.get(".item-card").should("have.length", 40);
  });

  it("redering test", () => {
    cy.get(".search-input").type("porter");
    cy.get(".search-input").trigger("keyup", { keyCode: 13 });
    cy.get(".item-card").should("have.length", 20);
  });
});

describe("api test", () => {
  it("popular movie api", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("http://localhost:8080/");

    cy.wait("@getPopularMovies").then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });

  it("search movie api", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("http://localhost:8080/");

    cy.wait("@getPopularMovies").then((interception) => {
      const movieItems = interception.response?.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });
});
