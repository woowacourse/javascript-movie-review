import { MOVIE_IDS } from "../fixtures/constants";

describe("모달 기능 테스트", () => {
  beforeEach(() => {
    cy.setupMovieListTest({ fixture: "popularMovies.json", wait: true });
  });

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

  const verifyModalContentAndClose = () => {
    verifyMovieDetailInModal();
    cy.closeModal();
    cy.verifyModalClosed();
  };

  describe("모달 열기 방법에 따른 테스트", () => {
    it("특정 영화 썸네일 클릭 시 모달 창이 열리고 해당 영화의 상세 정보가 화면에 보여진다.", () => {
      cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);
      verifyModalContentAndClose();
    });

    it("자세히 보기 버튼 클릭 시 모달 창이 열리고 해당 영화의 상세 정보가 화면에 보여진다.", () => {
      cy.clickDetailButton();
      verifyModalContentAndClose();
    });
  });
});
