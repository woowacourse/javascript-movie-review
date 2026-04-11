import { moviesFixture, movieFixture } from "../../test/fixtures";

const mathRound = (value: number, numDigits:number = 1): number => {
  return Math.round(value * 10 ** numDigits) / 10 ** numDigits;
}

describe("영화 상세 팝업 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular?page=1", {
      statusCode: 200,
      body: {
        page: 1,
        results: [...moviesFixture],
        total_pages: 2,
        total_results: 40,
      },
    }).as("getPopularPage1");

    cy.intercept("GET", `**/movie/${movieFixture.id}`, {
      statusCode: 200,
      body: { ...movieFixture },
    }).as("getMovieId");

    cy.visit("localhost:5173");
    cy.wait("@getPopularPage1");
  });

  it("제목을 누르면 상세 팝업이 렌더링 된다.", () => {
    cy.get("#movie-list li").first().find(".thumbnail").click();

    cy.wait("@getMovieId");

    cy.get("#modalBackground").should('have.length', 1);
    cy.get("#detail-modal-title").should('have.text', movieFixture.title);
    cy.get("#detail-modal-img").should('have.attr', 'src').and('include', movieFixture.poster_path);
    cy.get("#detail-modal-rate").should('have.text', mathRound(movieFixture.vote_average));
    cy.get("#detail-modal-detail").should('have.text', movieFixture.overview);
  });

  it("닫기버튼을 누르면 상세 팝업이 닫힌다.", () => {
    cy.get("#movie-list li").first().find(".thumbnail").click();
    
    cy.wait("@getMovieId");

    cy.get("#modalBackground").should('have.length', 1);        

    cy.get("#closeModal").click();

    cy.get("#modalBackground").should('have.length', 0);
  });

  it("ESC을 입력하면 상세 팝업이 닫힌다.", () => {
    cy.get("#movie-list li").first().find(".thumbnail").click();
    
    cy.wait("@getMovieId");

    cy.get("#modalBackground").should('have.length', 1);

    cy.get("body").type("{esc}");

    cy.get("#modalBackground").should('have.length', 0);
  });

  it("평점 별을 눌러서 평점을 매길수 있다.", () => {
    cy.get("#movie-list li").first().find(".thumbnail").click();
    
    cy.wait("@getMovieId");

    const rate = 5;

    cy.get("#detail-modal-star-box .star").eq(rate - 1).click();

    cy.get("#detail-modal-star-box .star.on").should('have.length', rate);
  });

  it("매겼던 평점을 다시 확인할 수 있다", () => {
    cy.get("#movie-list li").first().find(".thumbnail").click();
    
    cy.wait("@getMovieId");

    const rate = 5;

    cy.get("#detail-modal-star-box .star.on").should('have.length', rate);
  });
  

  it("매겼던 평점을 평점의별을 눌러서 다시 평점을 매길 수 있다", () => {
    cy.get("#movie-list li").first().find(".thumbnail").click();
    
    cy.wait("@getMovieId");

    const prevRate = 5;
    const rate = 1;

    cy.get("#detail-modal-star-box .star.on").should('have.length', prevRate);

    cy.get("#detail-modal-star-box .star").eq(rate - 1).click();

    cy.get("#detail-modal-star-box .star.on").should('have.length', rate);
  });
});
