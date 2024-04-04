declare namespace Cypress {
  interface Chainable<Subject> {
    getPopularMoviesWithDelay(): Chainable<void>;
    getSearchMoviesWithDelay(name: string, jsonData: string): Chainable<void>;
    search(keyword: string): Chainable<void>;
    getPopularMoviesWithError(code: number): Chainable<void>;
    getPopularMoviesWithNetworkOff(): Chainable<void>;
    getDetailMovie(): Chainable<void>;
  }
}

const POPULAR_REQUEST_URL = "https://api.themoviedb.org/3/movie/popular?*";

const SEARCH_REQUEST_URL = "https://api.themoviedb.org/3/search/movie?*";

const DETAIL_REQUEST_URL = "https://api.themoviedb.org/3/movie/*";

Cypress.Commands.add("getPopularMoviesWithDelay", () => {
  cy.intercept(
    {
      method: "GET",
      url: POPULAR_REQUEST_URL,
    },
    { fixture: "popular-movies.json", delay: 2000 }
  ).as("getPopularMovies");
});

Cypress.Commands.add("getSearchMoviesWithDelay", (name: string, jsonData: string) => {
  cy.intercept(
    {
      method: "GET",
      url: SEARCH_REQUEST_URL,
    },
    { fixture: jsonData }
  ).as(name);
});

Cypress.Commands.add("search", (keyword: string) => {
  cy.get("input#search-input").type(keyword);
  cy.get("button#search-button").click();
});

Cypress.Commands.add("getPopularMoviesWithError", (code: number) => {
  cy.intercept(
    {
      method: "GET",
      url: POPULAR_REQUEST_URL,
    },
    { statusCode: code }
  ).as("getPopularMoviesWithError");
});

Cypress.Commands.add("getPopularMoviesWithNetworkOff", () => {
  cy.intercept(
    {
      method: "GET",
      url: POPULAR_REQUEST_URL,
    },
    { forceNetworkError: true }
  ).as("getPopularMoviesWithNetworkOff");
});

Cypress.Commands.add("getDetailMovie", () => {
  cy.intercept(
    {
      method: "GET",
      url: DETAIL_REQUEST_URL,
    },
    { fixture: "detail-movie.json", forceNetworkError: false }
  ).as("getDetailMovie");
});
