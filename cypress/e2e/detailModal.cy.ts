/// <reference types="cypress" />

describe("영화 상세 모달 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      { fixture: "popularMovieData.json" }
    ).as("fetchMovies");

    cy.visit("http://localhost:5173");
    cy.wait("@fetchMovies");
  });

  it("영화 썸네일을 클릭하면 모달이 나타나고, 영화 정보가 포함되어 있어야 한다.", () => {
    cy.get(".thumbnail-list .item")
      .first()
      .find("strong")
      .invoke("text")
      .then((expectedTitle) => {
        cy.get(".thumbnail-list .item").first().click();

        cy.get(".modal").should("be.visible");
        cy.get(".modal h2").should("have.text", expectedTitle);
      });
  });

  it("모달 닫기 버튼을 클릭하면 모달이 닫혀야 한다.", () => {
    cy.get(".thumbnail-list .item").first().click();
    cy.get(".modal").should("be.visible");

    cy.get(".close-modal").click();
    cy.get(".modal").should("not.visible");
  });

  it("모달 외부를 클릭하면 모달이 닫혀야 한다.", () => {
    cy.get(".thumbnail-list .item").first().click();
    cy.get(".modal").should("be.visible");

    cy.get(".modal").click("topLeft");
    cy.get(".modal").should("not.visible");
  });
});
