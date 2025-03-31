const localHostUrl = Cypress.env("LOCAL_HOST_URL");
describe("details 테스트", () => {
  beforeEach(() => {
    // 예외 처리 추가
    cy.on("uncaught:exception", (err) => {
      // showModal 관련 에러는 무시
      if (err.message.includes("showModal")) {
        return false;
      }
      return true;
    });

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit(localHostUrl);

    // 모달이 열려있으면 닫기
    cy.get("#modal-dialog").then(($modal) => {
      if ($modal.prop("open")) {
        cy.get("#closeModal").click();
        // 모달이 완전히 닫힐 때까지 대기
        cy.get("#modal-dialog").should("not.be.visible");
      }
    });
  });

  afterEach(() => {
    // 각 테스트 종료 후 모달 닫기
    cy.get("#modal-dialog").then(($modal) => {
      if ($modal.prop("open")) {
        cy.get("#closeModal").click();
        // 모달이 완전히 닫힐 때까지 대기
        cy.get("#modal-dialog").should("not.be.visible");
      }
    });
  });

  it("별점이 매겨지면 기록으로 남아야 된다.", () => {
    // 테스트용 뷰포트에 에러가 있어서, 이경우에만 이렇게 쓰는것으로 했습니다.
    cy.get("#hero-details-button").should("be.visible").click({ force: true });

    // 모달이 열리고 데이터가 로드될 때까지 대기
    cy.get("#modal-dialog").should("be.visible");
    cy.get("#modal-container").should("be.visible");
    cy.get("#details-title").should("be.visible").and("contain", "미키 17");

    // 별점 매기기
    cy.get('label[for="star5"]').click();
    cy.get("#star5").should("be.checked");
    cy.get("#star-rating-details").should("contain", "명작이에요");
    cy.get("#star-rating-numbers").should("contain", "(10/10)");

    // 모달 닫기
    cy.get("#closeModal").click();
    cy.get("#modal-dialog").should("not.be.visible");

    // 검색 및 재확인
    const searchValue = "미키 17";
    cy.get(".search-bar").type(`${searchValue}{enter}`);

    // 검색 결과가 로드될 때까지 대기
    cy.get("#696506").should("be.visible").click();

    // 모달이 열리고 데이터가 로드될 때까지 대기
    cy.get("#modal-dialog").should("be.visible");
    cy.get("#modal-container").should("be.visible");
    cy.get("#details-title").should("be.visible").and("contain", "미키 17");

    // 별점이 유지되었는지 확인
    cy.get("#star5").should("be.checked");
    cy.get("#star-rating-details").should("contain", "명작이에요");
    cy.get("#star-rating-numbers").should("contain", "(10/10)");
  });
});
