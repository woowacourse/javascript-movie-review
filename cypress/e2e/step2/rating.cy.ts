import { MOVIE_DETAIL_FIXTURE } from "./fixtures";

describe("별점", () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.intercept("GET", "**/movie/popular**", (req) => {
      req.reply({
        results: [
          { id: 1, title: "인터스텔라", poster_path: null, vote_average: 8.6 },
        ],
        page: 1,
        total_pages: 1,
      });
    }).as("popularMovies");

    cy.intercept("GET", "**/movie/1**", (req) => {
      req.reply(MOVIE_DETAIL_FIXTURE);
    }).as("movieDetail");

    cy.visit("/");
    cy.wait("@popularMovies");
    cy.get(".item").first().click();
    cy.wait("@movieDetail");
  });

  it("별점 클릭 시 점수와 라벨이 표시된다", () => {
    cy.get(".my-rating-star").eq(3).click();
    cy.get(".my-rating-score").should("contain.text", "(8/10)");
    cy.get(".my-rating-text").should("contain.text", "재미있어요");
  });

  it("별점이 localStorage에 저장된다", () => {
    cy.get(".my-rating-star").eq(4).click();
    cy.get("li[data-id]").first().then(($el) => {
      const movieId = $el.attr("data-id") as string;
      cy.window().then((win) => {
        const stored = win.localStorage.getItem("ratings");
        const ratings = JSON.parse(stored ?? "{}");
        expect(ratings[movieId]).to.equal(10);
      });
    });
  });

  it("모달 재오픈 시 별점이 유지된다", () => {
    cy.get(".my-rating-star").eq(2).click();
    cy.get("dialog.modal .close-modal").click({ force: true });
    cy.get(".item").first().click();
    cy.wait("@movieDetail");
    cy.get(".my-rating-score").should("contain.text", "(6/10)");
  });

  it("별점 hover 시 해당 별까지 채워진다", () => {
    cy.get(".my-rating-star").eq(2).trigger("mouseenter");
    cy.get(".my-rating-star").eq(0).should("have.class", "filled");
    cy.get(".my-rating-star").eq(1).should("have.class", "filled");
    cy.get(".my-rating-star").eq(2).should("have.class", "filled");
    cy.get(".my-rating-star").eq(3).should("not.have.class", "filled");
  });

  it("별점 hover 해제 시 저장된 별점으로 돌아온다", () => {
    cy.get(".my-rating-star").eq(1).click();
    cy.get(".my-rating-star").eq(4).trigger("mouseenter");
    cy.get(".my-rating-star").eq(4).trigger("mouseleave");
    cy.get(".my-rating-score").should("contain.text", "(4/10)");
  });
});
