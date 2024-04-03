describe("[API 테스트]사용자가 movieItem을 눌러 모달로 영화의 상세정보를 확인할 수 있다.", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");

    cy.wait(1500);

    cy.get("ul.item-list").children().first().click();
    cy.get(".modal").should("have.class", "modal--open");
  });

  it("사용자가 movieItem을 누르면 모달창이 뜨고, 모달창에서 영화의 제목, 포스터, 장르, 별점, 소개글을 확인할 수 있다.", () => {
    cy.get("ul.item-list")
      .children()
      .first()
      .invoke("attr", "id")
      .as("movieId");

    cy.get("@movieId").then((id) => {
      const detailMovieUrl =
        `https://api.themoviedb.org/3/movie/${id}?` +
        new URLSearchParams({
          api_key: Cypress.env("API_KEY"),
          language: "ko-KR",
        });

      cy.request("GET", detailMovieUrl).as("movieDetails");
    });
    cy.get("@movieDetails").its("status").should("eq", 200);
    cy.get("@movieDetails").its("body").as("firstMovieDetail");

    cy.get("@firstMovieDetail")
      .its("title")
      .then((title) => {
        cy.get(".modal-container").contains(title);
      });

    cy.get("@firstMovieDetail")
      .its("poster_path")
      .then((src) => {
        cy.get(".modal-container>.modal-detail-body>img.item-thumbnail")
          .should("have.attr", "src")
          .should("include", src);
      });

    cy.get("@firstMovieDetail")
      .its("genres")
      .then((genres) => {
        cy.get(".modal-container").contains(
          genres.map((el: { id: number; name: string }) => el.name).join(", ")
        );
      });

    cy.get("@firstMovieDetail")
      .its("vote_average")
      .then((vote) => {
        cy.get(".modal-container").contains(vote);
      });

    cy.get("@firstMovieDetail")
      .its("overview")
      .then((description) => {
        cy.get(".modal-container").contains(description);
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
