describe("별점 등록 시나리오 테스트", () => {
  const mockPopularMovies = {
    results: Array.from({ length: 20 }, (_, i) => ({
      id: 4000 + i,
      title: `평점 영화 ${i + 1}`,
      poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
      vote_average: 7.8,
    })),
    page: 1,
    total_pages: 1,
  };

  const mockMovieDetail = {
    id: 4000,
    poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
    title: "평점 영화 1",
    release_date: "2024-01-01",
    genres: [{ id: 1, name: "모험" }],
    vote_average: 7.8,
    overview: "평점 테스트용 줄거리",
  };

  const openMovieDetail = () => {
    cy.get(".thumbnail-container").first().click();
    cy.wait("@getMovieDetail");
  };

  const assertFilledStars = (count: number) => {
    cy.get(".review-star").each(($star, index) => {
      const expectation = index < count ? "star_filled" : "star_empty";
      cy.wrap($star)
        .invoke("attr", "src")
        .should("include", expectation);
    });
  };

  beforeEach(() => {
    cy.intercept(
      "GET",
      "**/movie/popular?*page=1*",
      mockPopularMovies,
    ).as("getPopular");

    cy.intercept("GET", "**/movie/4000?*", mockMovieDetail).as("getMovieDetail");

    cy.visit("http://localhost:5173/");
    cy.wait("@getPopular");
    cy.clearLocalStorage();
  });

  it("1. 영화 상세정보 모달이 활성화 되었을 때 별점이 없다면 별점 없음이 표시된다.", () => {
    openMovieDetail();

    cy.get(".review-text").should("have.text", "별점 없음");
    cy.get(".review-score").should("have.text", "(0/10)");
    assertFilledStars(0);
  });

  it("2. 첫 번째 별을 등록하면 해당하는 텍스트와 함께 별 1개만 채워진다.", () => {
    openMovieDetail();

    cy.get('.review-star[data-score="2"]').click();

    cy.get(".review-text").should("have.text", "최악이에요");
    cy.get(".review-score").should("have.text", "(2/10)");
    assertFilledStars(1);
  });

  it("3. 두 번째 별을 등록하면 해당하는 텍스트와 함께 별 2개만 채워진다.", () => {
    openMovieDetail();

    cy.get('.review-star[data-score="4"]').click();

    cy.get(".review-text").should("have.text", "별로예요");
    cy.get(".review-score").should("have.text", "(4/10)");
    assertFilledStars(2);
  });

  it("4. 세 번째 별을 등록하면 해당하는 텍스트와 함께 별 3개만 채워진다.", () => {
    openMovieDetail();

    cy.get('.review-star[data-score="6"]').click();

    cy.get(".review-text").should("have.text", "보통이에요");
    cy.get(".review-score").should("have.text", "(6/10)");
    assertFilledStars(3);
  });

  it("5. 네 번째 별을 등록하면 해당하는 텍스트와 함께 별 4개만 채워진다.", () => {
    openMovieDetail();

    cy.get('.review-star[data-score="8"]').click();

    cy.get(".review-text").should("have.text", "재미있어요");
    cy.get(".review-score").should("have.text", "(8/10)");
    assertFilledStars(4);
  });

  it("6. 다섯 번째 별을 등록하면 해당하는 텍스트와 함께 별 5개만 채워진다.", () => {
    openMovieDetail();

    cy.get('.review-star[data-score="10"]').click();

    cy.get(".review-text").should("have.text", "명작이에요");
    cy.get(".review-score").should("have.text", "(10/10)");
    assertFilledStars(5);
  });
});
