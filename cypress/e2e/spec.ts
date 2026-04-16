const POPULAR_API = "**/movie/popular**";
const SEARCH_API = "**/search/movie**";
const MOVIE_DETAIL_API = /\/movie\/\d+/;

export const interceptPopularPage1 = () => {
  cy.intercept("GET", POPULAR_API, { fixture: "popularMoviesPage1.json" }).as(
    "getPopularPage1",
  );
};

export const interceptPopularPage2 = () => {
  cy.intercept("GET", POPULAR_API, { fixture: "popularMoviesPage2.json" }).as(
    "getPopularPage2",
  );
};

export const interceptSearchPage1 = () => {
  cy.intercept("GET", SEARCH_API, { fixture: "searchMoviesPage1.json" }).as(
    "getSearchPage1",
  );
};

export const interceptSearchPage2 = () => {
  cy.intercept("GET", SEARCH_API, { fixture: "searchMoviesPage2.json" }).as(
    "getSearchPage2",
  );
};

export const interceptMovieDetail = () => {
  cy.intercept("GET", MOVIE_DETAIL_API, { fixture: "movieDetail.json" }).as(
    "getMovieDetail",
  );
};

export const interceptMovieDetailWithDelay = (delay: number) => {
  cy.intercept("GET", MOVIE_DETAIL_API, (req) => {
    req.reply({ delay, fixture: "movieDetail.json" });
  }).as("getMovieDetail");
};
