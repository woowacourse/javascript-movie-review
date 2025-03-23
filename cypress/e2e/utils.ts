export function setupMovieApiMocks() {
  cy.intercept(
    "GET",
    /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
    { fixture: "movie-popular.json" }
  ).as("getPopularMovies");

  cy.intercept(
    "GET",
    /^https:\/\/api\.themoviedb\.org\/3\/search\/movie(\?.*)?$/,
    (req) => {
      const url = new URL(req.url);
      const query = url.searchParams.get("query");

      if (query === "짱구") {
        req.reply({ fixture: "movie-search.json" });
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
