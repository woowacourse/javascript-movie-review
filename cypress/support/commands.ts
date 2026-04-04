Cypress.Commands.add('mockPopularMovies', (page: number) => {
  cy.intercept(
    { 
      method: "GET", 
      url: "**/movie/popular*", 
      query: {
        language: 'ko-KR', 
        page: String(page) 
      } 
    },
    { fixture: `popularMoviePage${page}.json` }
  ).as(`getPopularMoviesPage${page}`);
});

Cypress.Commands.add("mockSearchMovies", (searchQuery: string, jsonFile: string) => {
  cy.intercept(
    {
      method: "GET", 
      url: "**/search/movie*",
      query: {
        query: String(searchQuery),
        include_adult: String(false),
        language: 'ko-KR',
        page: String(1)
      }
    }, {
    fixture: String(jsonFile)
  }).as("searchMovies");
});

Cypress.Commands.add("performSearch", (searchQuery: string) => {
  cy.get(".search-input").clear().type(searchQuery);
  cy.get(".search-button").click();
});
