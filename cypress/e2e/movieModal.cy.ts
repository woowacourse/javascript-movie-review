describe("모달 동작 테스트", () => {
  const BASE_URL = "https://api.themoviedb.org/3";

  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("영화를 클릭하면 해당 영화의 정보를 담은 모달이 등장한다.", () => {
    // given
    const movieNameForSearch = "해리 포터";
    const movieId = 767;
    const movieDetailsUrl = `${BASE_URL}/movie/${movieId}`;
    const params = {
      api_key: Cypress.env("API_KEY"),
      language: "ko-KR",
    };
    const movieDetailsQueryString = `${movieDetailsUrl}?${new URLSearchParams(
      params
    ).toString()}`;
    cy.get('.search-box input[type="text"]').clear().type(movieNameForSearch);
    cy.get(".search-box .search-button").click();

    cy.request("GET", movieDetailsQueryString).as("movieDetails");

    // when
    cy.get(`#${movieId}`).click();

    // then
    cy.get(".modal-backdrop").should("be.visible");

    cy.fixture("movie-harry-details.json").then((movieDetails) => {
      cy.get(".modal-title").should("contain.text", movieDetails.title);
      cy.get(".modal-genres").should(
        "contain.text",
        movieDetails.genres.map((genre) => genre.name).join(", ")
      );
    });
  });
});
