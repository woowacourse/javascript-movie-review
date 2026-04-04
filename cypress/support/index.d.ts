declare namespace Cypress {
  interface Chainable {
    mockPopularMovies(page: number): Chainable<undefined>;
    mockSearchMovies(searchQuery: string, jsonFile: string): Chainable<undefined>;
    performSearch(searchQuery: string): Chainable<void>;
  }
}
