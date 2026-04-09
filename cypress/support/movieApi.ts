import { MockMovie } from "./types";

export const createMovie = (id: number, title: string): MockMovie => ({
  id,
  title,
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  vote_average: 8.5,
});

export const createMoviePage = (
  prefix: string,
  page: number,
  count = 20,
): MockMovie[] =>
  Array.from({ length: count }, (_, index) => {
    const id = (page - 1) * count + index + 1;
    return createMovie(id, `${prefix} ${id}`);
  });

export const mockPopularMovies = (pages: Record<number, MockMovie[]>) => {
  cy.intercept("GET", "**/movie/popular**", (req) => {
    const page = Number(req.query.page ?? 1);

    req.reply({
      statusCode: 200,
      body: {
        results: pages[page] ?? [],
      },
    });
  }).as("getPopularMovies");
};

export const mockSearchMovies = (movies: MockMovie[]) => {
  cy.intercept("GET", "**/search/movie**", {
    statusCode: 200,
    body: {
      results: movies,
    },
  }).as("searchMovies");
};

export const mockSearchMoviePages = (pages: Record<number, MockMovie[]>) => {
  cy.intercept("GET", "**/search/movie**", (req) => {
    const page = Number(req.query.page ?? 1);

    req.reply({
      statusCode: 200,
      body: {
        results: pages[page] ?? [],
      },
    });
  }).as("searchMovies");
};
