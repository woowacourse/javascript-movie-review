import type { Movie } from "../../src/types";

export const createMovie = (id: number, title: string): Movie => ({
  id,
  title,
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  vote_average: 8.5,
  overview: `${title} 줄거리`,
  release_date: "2024-01-01",
  genres: [{ name: "드라마" }],
});

export const createMoviePage = (
  prefix: string,
  page: number,
  count = 20,
): Movie[] =>
  Array.from({ length: count }, (_, index) => {
    const id = (page - 1) * count + index + 1;
    return createMovie(id, `${prefix} ${id}`);
  });

export const mockPopularMovies = (pages: Record<number, Movie[]>) => {
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

export const mockSearchMovies = (movies: Movie[]) => {
  cy.intercept("GET", "**/search/movie**", {
    statusCode: 200,
    body: {
      results: movies,
    },
  }).as("searchMovies");
};

export const mockSearchMoviePages = (pages: Record<number, Movie[]>) => {
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
