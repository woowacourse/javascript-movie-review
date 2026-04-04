import { createMoviePage, mockPopularMovies } from "../support/movieApi";

describe("더보기 버튼을 누르면 20개의 영화를 추가로 보여준다.", () => {
  beforeEach(() => {
    mockPopularMovies({
      1: createMoviePage("인기 영화", 1),
      2: createMoviePage("인기 영화", 2),
      3: createMoviePage("인기 영화", 3),
      4: createMoviePage("인기 영화", 4),
      5: createMoviePage("인기 영화", 5),
      6: createMoviePage("인기 영화", 6),
      7: createMoviePage("인기 영화", 7),
      8: createMoviePage("인기 영화", 8),
      9: createMoviePage("인기 영화", 9),
      10: createMoviePage("인기 영화", 10),
      11: createMoviePage("인기 영화", 11),
    });

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");
  });

  it("초기 진입 시 영화 20개를 보여준다.", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.get(".thumbnail-list li")
      .first()
      .find(".title")
      .should("have.text", "인기 영화 1");
  });

  it("더보기 버튼을 1번 누르면 영화 개수가 40개가 된다.", () => {
    cy.get(".item").should("have.length", 20);

    cy.get(".display-more-btn").click();
    cy.wait("@getPopularMovies");

    cy.get(".item").should("have.length", 40);
  });
  it("페이지 접속 후 더보기 버튼을 10번 누르면 영화 개수가 220개가 된다.", () => {
    cy.visit("localhost:5173");
    cy.get(".item").should("have.length", 20);
    for (let i = 0; i < 10; i++) {
      cy.get(".display-more-btn").click();
    }
    cy.get(".item").should("have.length", 220);
  });
});
