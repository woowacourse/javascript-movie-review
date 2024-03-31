describe("영화 상세 정보 기능 테스트", () => {
  beforeEach(() => {
    cy.getPopularMoviesWithDelay();

    cy.visit("/");

    cy.wait("@getPopularMovies");

    cy.getDetailMovie();
  });

  it("영화 정보 목록 중 하나의 데이터를 클릭하면 영화의 상세 정보 모달이 열린다.", () => {
    cy.get("ul#movie-list-container").children().first().click();

    cy.wait("@getDetailMovie");

    cy.get("section#movie-detail-container").should("exist");
  });

  it("영화 정보 목록 중 하나의 데이터를 클릭하면 해당 영화의 상세 정보를 보여준다", () => {
    cy.get("ul#movie-list-container").children().first().click();

    cy.wait("@getDetailMovie");

    cy.get("p.detail-title").should("exist").and("not.have.text", ""); // 빈 문자열이 아니다.
    cy.get("button.modal-cancel-button").should("exist");

    cy.get("img.detail-thumbnail").should("exist").and("have.attr", "src");
    cy.get("p.genres-rate").should("exist").and("not.have.text", "");
    cy.get("p.detail-overview").should("exist").and("not.have.text", "");

    cy.get("div.rate-container").should("exist");
  });

  it("영화 상세 정보 모달의 닫기 버튼을 클릭하면 상세 정보 모달은 사라져야한다.", () => {
    cy.get("ul#movie-list-container").children().first().click();

    cy.wait("@getDetailMovie");

    cy.get("button.modal-cancel-button").click();

    cy.get("section#movie-detail-container").should("not.exist");
  });

  it("영화 상세 정보 모달의 외부 영역을 클릭하면 상세 정보 모달은 사라져야한다.", () => {
    cy.get("ul#movie-list-container").children().first().click();

    cy.wait("@getDetailMovie");

    cy.get("dialog#modal").click("top", { force: true });

    cy.get("section#movie-detail-container").should("not.exist");
  });

  context("영화 별점 남기기 기능 테스트", () => {
    it("영화 별점을 남기지 않았을 경우 평점 숫자는 0이어야 한다.", () => {
      const EXPECTED_RATING_NUMBER = 0;

      cy.get("ul#movie-list-container").children().first().click();

      cy.wait("@getDetailMovie");

      cy.get("p#rating-number").should("have.text", String(EXPECTED_RATING_NUMBER));
    });

    it("영화 별점을 남기지 않았을 경우 평점 메시지는 '평가 없음'이어야 한다.", () => {
      const EXPECTED_RATING_MESSAGE = "평가 없음";

      cy.get("ul#movie-list-container").children().first().click();

      cy.wait("@getDetailMovie");

      cy.get("p#rating-message").should("have.text", EXPECTED_RATING_MESSAGE);
    });

    it("사용자가 남긴 평점에 따라 평점 숫자와 평점 메시지가 변경되며, 새로고침한 뒤에도 평점이 유지되어야 한다.", () => {
      cy.get("ul#movie-list-container").children().first().click();

      cy.wait("@getDetailMovie");

      const RATING_TEST_DATA = [
        {
          rating: 2,
          ratingMessage: "최악이에요",
        },
        {
          rating: 4,
          ratingMessage: "별로에요",
        },
        {
          rating: 6,
          ratingMessage: "보통이에요",
        },
        {
          rating: 8,
          ratingMessage: "재미있어요",
        },
        {
          rating: 10,
          ratingMessage: "명작이에요",
        },
      ];

      RATING_TEST_DATA.forEach(({ rating, ratingMessage }, index) => {
        cy.get("div#star-logo-container").children().eq(index).click();

        cy.get("p#rating-number").invoke("text").should("equal", String(rating));
        cy.get("p#rating-message").invoke("text").should("equal", ratingMessage);

        cy.getPopularMoviesWithDelay();
        cy.reload();

        cy.wait("@getPopularMovies");

        cy.getDetailMovie();

        cy.get("ul#movie-list-container").children().first().click();
        cy.wait("@getDetailMovie");

        cy.get("p#rating-number").invoke("text").should("equal", String(rating));
        cy.get("p#rating-message").invoke("text").should("equal", ratingMessage);
      });
    });
  });
});
