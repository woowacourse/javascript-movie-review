import type { Movie } from "../../src/types";

export const createMovieDetail = (
  id: number,
  title: string,
): Movie => ({
  id,
  title,
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  vote_average: 8.5,
  overview: `${title} 줄거리`,
  release_date: "2024-01-01",
  genres: [{ name: "드라마" }],
});

export const mockMovieDetails = (movieDetails: Record<number, Movie>) => {
  cy.intercept("GET", /\/movie\/\d+\?/, (req) => {
    const id = Number(req.url.split("/movie/")[1].split("?")[0]);

    req.reply({
      statusCode: 200,
      body: movieDetails[id],
    });
  }).as("getMovieDetail");
};
