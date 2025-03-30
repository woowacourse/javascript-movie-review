/// <reference types="cypress" />

export function setupMovieApiMocks() {
  cy.intercept(
    "GET",
    /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
    { fixture: "movie-popular.json" }
  ).as("getPopularMovies");

  cy.intercept(
    "GET",
    "https://api.themoviedb.org/3/movie/777443?language=ko-KR",
    { fixture: "movie-detail.json" }
  ).as("getMovieDetail");

  cy.intercept(
    "GET",
    /^https:\/\/api\.themoviedb\.org\/3\/search\/movie(\?.*)?$/,
    (req) => {
      const url = new URL(req.url);
      const query = url.searchParams.get("query");
      const page = url.searchParams.get("page");
      console.log(page);

      if (query === "짱구") {
        if (page === "1") req.reply({ fixture: "movie-search.json" });
        if (page === "2") req.reply({ fixture: "movie-search2.json" });
      } else if (query === "ㅇㅇㅇㅇㅇ") {
        req.reply({ fixture: "movie-no-result.json" });
      } else {
        req.reply({
          statusCode: 404,
          body: {
            status_message: "서버 오류입니다.",
            status_code: 34,
          },
        });
      }
    }
  ).as("getSearchMovies");
}
