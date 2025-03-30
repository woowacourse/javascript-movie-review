describe("모달 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular**", {
      statusCode: 200,
      body: mockMovies,
    }).as("getMovies");

    cy.visit("http://localhost:5173/");
    cy.wait("@getMovies");
  });

  const movieId = 1022789;

  const mockMovies = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: "/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
        genre_ids: [12, 16, 35, 10751], // 모험, 애니메이션, 코미디, 가족
        id: movieId,
        original_language: "en",
        original_title: "Inside Out 2",
        overview:
          "13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤 본부를 운영하는 '기쁨', '슬픔', '버럭', '까칠', '소심'. 그러던 어느 날, 낯선 감정인 '불안', '당황', '따분', '부럽'이가 본부에 등장하고, 언제나 최악의 상황을 대비하며 제멋대로인 '불안'이와 기존 감정들은 계속 충돌한다. 결국 새로운 감정들에 의해 본부에서 쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한 모험을 시작하는데…",
        popularity: 52.9615,
        poster_path: "/x2BHx02jMbvpKjMvbf8XxJkYwHJ.jpg",
        release_date: "2024-06-11",
        title: "인사이드 아웃 2",
        video: false,
        vote_average: 8,
        vote_count: 5694,
      },
    ],
    total_pages: 1,
    total_results: 1,
  };

  const verifyMovieDetailInModal = () => {
    cy.get(".modal").should("be.visible");

    cy.get(".modal-title").should("contain", "인사이드 아웃 2");
    cy.get(".modal-category").should(
      "contain",
      "2024 · 모험, 애니메이션, 코미디, 가족"
    );
    cy.get(".modal-detail").should("contain", "13살이 된 라일리의 행복을 위해");
    cy.get(".modal-rate").should("contain", "8");
  };

  const closeAndVerifyModalClosed = () => {
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".close-modal").click();
    cy.get(".modal-background").should("not.have.class", "active");
  };

  const testModalOpeningAndClosing = (openModalAction: () => void) => {
    openModalAction();
    verifyMovieDetailInModal();
    closeAndVerifyModalClosed();
  };

  describe("모달 열기 방법에 따른 테스트", () => {
    it("특정 영화 썸네일 클릭 시 모달 창이 열리고 해당 영화의 상세 정보가 화면에 보여진다.", () => {
      testModalOpeningAndClosing(() => {
        cy.get(`.item[data-movie-id="${movieId}"]`).first().click();
      });
    });

    it("자세히 보기 버튼 클릭 시 모달 창이 열리고 해당 영화의 상세 정보가 화면에 보여진다.", () => {
      testModalOpeningAndClosing(() => {
        cy.get(`.primary.detail`).click();
      });
    });
  });
});
