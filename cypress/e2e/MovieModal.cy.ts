import { interceptMovieDetail, interceptMovieDetailError, interceptPopularPage1 } from "./spec";

const openModal = () => {
  interceptMovieDetail();
  cy.get("#main-thumbnail-list li").first().click();
  cy.wait("@getMovieDetail");
};

describe("영화 상세 모달 렌더링 테스트", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("영화 아이템을 클릭하면 상세 모달이 렌더링된다", () => {
    openModal();
    cy.get("#modal-dialog").should("be.visible");
  });

  it("모달에 영화 제목이 표시된다", () => {
    openModal();
    cy.get(".modal-description h2").should("contain.text", "영화1");
  });

  it("모달에 장르가 표시된다", () => {
    openModal();
    cy.get(".modal-description .category").should("contain.text", "액션");
    cy.get(".modal-description .category").should("contain.text", "모험");
  });

  it("모달에 줄거리가 표시된다", () => {
    openModal();
    cy.get(".detail p").should("contain.text", "영화1의 줄거리입니다.");
  });

  it("모달에 평균 별점이 표시된다", () => {
    openModal();
    cy.get(".modal-rate .rate span").should("contain.text", "8");
  });
});

describe("영화 상세 모달 닫기 테스트", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("닫기 버튼을 클릭하면 모달이 닫힌다", () => {
    openModal();
    cy.get("#closeModal").click({ force: true });
    cy.get("#modal-dialog").should("not.exist");
  });

  it("ESC 키를 누르면 모달이 닫힌다", () => {
    openModal();
    cy.get("#modal-dialog").then(($dialog) => {
      $dialog[0].dispatchEvent(new Event("cancel"));
    });
    cy.get("#modal-dialog").should("not.exist");
  });

  it("모달 내부를 클릭하면 모달이 닫히지 않는다", () => {
    openModal();
    cy.get(".modal-description h2").click();
    cy.get("#modal-dialog").should("be.visible");
  });
});

describe("영화 상세 모달 에러 테스트", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("영화 상세 조회에 실패하면 에러 메시지가 alert된다", () => {
    interceptMovieDetailError();
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    cy.get("#main-thumbnail-list li").first().click();
    cy.wait("@getMovieDetailError").then(() => {
      expect(alertStub).to.have.been.called;
    });
  });

  it("영화 상세 조회에 실패하면 모달이 렌더링되지 않는다", () => {
    interceptMovieDetailError();
    cy.on("window:alert", () => {});

    cy.get("#main-thumbnail-list li").first().click();
    cy.wait("@getMovieDetailError");

    cy.get("#modal-dialog").should("not.exist");
  });
});
