import { MOVIE_IDS } from "../fixtures/constants";

describe("사용자가 영화 상세 정보를 확인하는 시나리오", () => {
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

  it("관심 있는 영화 포스터를 클릭하여 영화 상세 정보를 확인한다.", () => {
    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);
    verifyModalContentAndClose();
  });

  it("헤더에 있는 '자세히 보기' 버튼을 클릭하여 추천 영화 상세 정보를 확인한다.", () => {
    cy.clickDetailButton();
    verifyModalContentAndClose();
  });
});
