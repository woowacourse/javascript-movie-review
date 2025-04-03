///  <reference types="cypress" />

describe("영화 상세 모달 열기 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    const popularMovieUrl =
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
      },
    };

    cy.request({
      method: "GET",
      url: popularMovieUrl,
      ...options,
    }).as("popularMovies");
  });
  it("영화 썸네일을 클릭하면 모달이 나타나고, 영화 정보가 포함되어 있어야 한다.", () => {
    cy.get(".thumbnail-list .item")
      .first()
      .find("strong")
      .invoke("text")
      .then((expectedTitle) => {
        cy.get(".thumbnail-list .item").first().click();

        cy.get(".modal").should("be.visible").and("have.attr", "open");
        cy.get(".modal h2").should("have.text", expectedTitle);
      });
  });
});

describe("영화 상세 모달 닫기 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    const popularMovieUrl =
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
      },
    };

    cy.request({
      method: "GET",
      url: popularMovieUrl,
      ...options,
    }).as("popularMovies");
    cy.get(".thumbnail-list .item").first().click();

    cy.get(".modal").should("be.visible").and("have.attr", "open");
  });

  it("영화 썸네일을 클릭하면 모달이 나타나고, 닫기 버튼을 누르면 모달이 닫힌다.", () => {
    cy.get("#close-modal").click();
    cy.get(".modal").should("not.be.visible");
  });

  it("영화 썸네일을 클릭하면 모달이 나타나고, 모달 배경을 누르면 모달이 닫힌다.", () => {
    cy.get("body").click(0, 0);
    cy.get(".modal").should("have.css", "display", "none");
  });
});
