describe("디테일 모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("영화 목록 중 하나를 클릭하면 디테일 모달창이 나타난다.", () => {
    cy.get(".thumbnail-list > li").first().click();

    cy.get("dialog.detail-modal-container").should("be.visible");
  });

  it("디테일 모달창에서 별점을 클릭하면, 별 이미지와 텍스트가 해당 점수에 맞게 변경된다.", () => {
    cy.get(".thumbnail-list > li").first().click();

    cy.get(".detail-modal-container .star-wrapper img").eq(3).click(); // 8점

    // 별이 4개 채워졌는지 확인
    cy.get(".detail-modal-container .star-wrapper img[src$='star_filled.png']").should("have.length", 4);

    cy.get(".detail-modal-container .rating-ment").should("contain", "재미있어요");
    cy.get(".detail-modal-container .rating-number").should("contain", "8");
  });

  it("디테일 모달창에서 별점을 등록한 뒤 새로고침하면, 등록된 별점이 그대로 유지된다.", () => {
    // 첫 번째 영화 클릭 후 별점 등록
    cy.get(".thumbnail-list > li").first().click();
    cy.get(".detail-modal-container .star-wrapper img").eq(4).click(); // 10점

    // 모달 닫기
    cy.get(".detail-modal-container .close-modal").click();

    cy.reload();

    cy.get(".thumbnail-list > li").first().click();

    // 등록한 별점 유지 여부 확인 (5개 별이 채워졌는지)
    cy.get(".detail-modal-container .star-wrapper img[src$='star_filled.png']").should("have.length", 5);
    cy.get(".detail-modal-container .rating-ment").should("contain", "명작이에요");
    cy.get(".detail-modal-container .rating-number").should("contain", "10");
  });
});
