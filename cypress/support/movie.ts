import {
  movieDetailFixture,
  moviesFixture,
  searchFixture,
} from "../../test/fixtures";

interface MockPopularPageParams {
  page: number;
  results: typeof moviesFixture;
  totalPages: number;
  totalResults: number;
}

interface MockSearchPageParams {
  query: string;
  page: number;
  results: typeof searchFixture;
  totalPages: number;
  totalResults: number;
}

export const mockPopularPage = ({
  page,
  results,
  totalPages,
  totalResults,
}: MockPopularPageParams) => {
  cy.intercept("GET", `**/movie/popular?page=${page}&language=ko-KR`, {
    statusCode: 200,
    body: {
      page,
      results: [...results],
      total_pages: totalPages,
      total_results: totalResults,
    },
  }).as(`getPopularPage${page}`);
};

export const mockSearchPage = ({
  query,
  page,
  results,
  totalPages,
  totalResults,
}: MockSearchPageParams) => {
  cy.intercept(
    "GET",
    `**/search/movie?page=${page}&query=${encodeURIComponent(query)}&language=ko-KR`,
    {
      statusCode: 200,
      body: {
        page,
        results: [...results],
        total_pages: totalPages,
        total_results: totalResults,
      },
    },
  ).as(`getSearchPage${page}`);
};

export const mockMovieDetail = (
  movieId: number,
  body: typeof movieDetailFixture,
) => {
  cy.intercept("GET", `**/movie/${movieId}?language=ko-KR`, {
    statusCode: 200,
    body,
  }).as("getMovieDetail");
};

export const openMovieModal = () => {
  cy.get("#movie-list li").first().click();
  cy.wait("@getMovieDetail");
  cy.get("#modal-background").should("have.class", "active");
};
