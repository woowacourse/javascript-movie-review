describe("[Fixtures 테스트]사용자가 movieItem을 눌러 모달로 영화의 상세정보를 확인할 수 있다.", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/*/,
      },
      { fixture: "kungfupandaMovieDetails.json" }
    ).as("getKungfupandaDetails");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "popularMovieList.json" }
    ).as("getPopularMovies");

    cy.visit("/");
    cy.get("ul.item-list").children().first().click();
    cy.get(".modal").should("have.class", "modal--open");
  });

  it("사용자가 movieItem을 누르면 모달창이 뜨고, 모달창에서 영화의 제목, 포스터, 장르, 별점, 소개글을 확인할 수 있다.", () => {
    cy.wait("@getKungfupandaDetails").then((interception) => {
      const movieDetails = interception.response?.body;

      cy.get(".modal-container").contains(movieDetails.title);
      cy.get(".modal-container>.modal-detail-body>img.item-thumbnail")
        .should("have.attr", "src")
        .should("include", movieDetails.poster_path);
      cy.get(".modal-container").contains(
        movieDetails.genres
          .map((el: { id: number; name: string }) => el.name)
          .join(", ")
      );
      cy.get(".modal-container").contains(movieDetails.vote_average);
      cy.get(".modal-container").contains(movieDetails.overview);
    });
  });

  it("사용자가 모달의 backdrop(검은 뒷배경)을 클릭하면 모달창이 닫힌다.", () => {
    cy.get(".modal-backdrop").click({ force: true });

    cy.get(".modal").should("not.have.class", "modal--open");
  });

  it("사용자가 모달의 닫기 버튼을 클릭하면 모달창이 닫힌다.", () => {
    cy.get(".modal-close-button").click();

    cy.get(".modal").should("not.have.class", "modal--open");
  });

  it("사용자가 Esc키를 누르면 모달창이 닫힌다.", () => {
    cy.get("body").type("{esc}");

    cy.get(".modal").should("not.have.class", "modal--open");
  });
});
