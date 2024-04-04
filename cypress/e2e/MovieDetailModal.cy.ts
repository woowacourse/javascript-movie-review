import { roundNumber } from "../../src/utils/roundNumber";

const MOVIE_TITLE = "쿵푸팬더 4";

const closeModal = () => {
  cy.get("#movie-detail-modal").should("not.have.class", "modal-open");
};

describe("영화 상세 모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");

    cy.intercept(
      {
        url: "https://api.themoviedb.org/3/search/movie?*",
      },
      {
        fixture: "searchedMovies.json",
      }
    );

    cy.get("li").contains(MOVIE_TITLE).click();
    cy.get("#movie-detail-modal").should("have.class", "modal-open");
  });

  it("'쿵푸팬더 4'를 누르면 해당 영화의 상세 모달이 열리고, 해당 영화의 상세 정보가 올바르게 표시되어야 한다.", () => {
    cy.get(".modal-title").contains(MOVIE_TITLE).should("exist");
    cy.get(".movie-genre")
      .contains("액션, 모험, 애니메이션, 코미디, 가족")
      .should("exist");
    cy.get(".movie-rating").contains(roundNumber(6.899, 1)).should("exist");
    cy.get(".movie-overview")
      .contains(
        "마침내 내면의 평화… 냉면의 평화…가 찾아왔다고 믿는 용의 전사 ‘포’ 이젠 평화의 계곡의 영적 지도자가 되고, 자신을 대신할 후계자를 찾아야만 한다. “이제 용의 전사는 그만둬야 해요?” 용의 전사로의 모습이 익숙해지고 새로운 성장을 하기보다 지금 이대로가 좋은 ‘포’ 하지만 모든 쿵푸 마스터들의 능력을 그대로 복제하는 강력한 빌런 ‘카멜레온’이 나타나고 그녀를 막기 위해 정체를 알 수 없는 쿵푸 고수 ‘젠’과 함께 모험을 떠나게 되는데… 포는 가장 강력한 빌런과 자기 자신마저 뛰어넘고 진정한 변화를 할 수 있을까?"
      )
      .should("exist");
  });

  it("상세 모달 외부 영역을 클릭하면 모달이 닫혀야 한다.", () => {
    cy.get("#movie-detail-modal").click("top");
    closeModal();
  });

  it("상세 모달의 닫기 버튼을 클릭하면 모달이 닫혀야 한다.", () => {
    cy.get("#close-button").click();
    closeModal();
  });

  it("ESC 키를 누르면 모달이 닫혀야 한다.", () => {
    cy.get("body").type("{esc}");
    closeModal();
  });

  it("상세 모달에서 해당 영화에 별점을 부여할 수 있다. 세 번째 별을 클릭하면 '6점 보통이에요'가 표시되어야 한다.", () => {
    cy.get("#star-rating-container img[data-index='3']").click();
    cy.get("#score-description").contains("6 보통이에요").should("exist");
  });
});
