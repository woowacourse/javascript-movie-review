import { MockMovieDetail } from "./types";

export const createMovieDetail = (
  id: number,
  title: string,
): MockMovieDetail => ({
  id,
  title,
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  vote_average: 8.5,
  overview: `${title} 줄거리`,
  release_date: "2024-01-01",
  genres: [{ name: "드라마" }],
});

export const mockMovieDetails = (
  movieDetails: Record<number, MockMovieDetail>,
) => {
  cy.intercept("GET", /\/movie\/\d+\?/, (req) => {
    const id = Number(req.url.split("/movie/")[1].split("?")[0]);

    req.reply({
      statusCode: 200,
      body: movieDetails[id],
    });
  }).as("getMovieDetail");
};
