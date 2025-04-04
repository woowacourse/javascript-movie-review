describe("Detail Modal 동작 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("자세히 보기 버튼 클릭 시 로딩 → 상세 모달 전환", () => {
    cy.get(".thumbnail-list > li").first().click();
    cy.wait(500);

    cy.get("#modalBackground").should("be.visible");
  });

  it("별점을 클릭하면 별 이미지와 텍스트가 업데이트 된다", () => {
    cy.get(".thumbnail-list > li").first().click();
    cy.wait(500);

    // 별점 클릭
    cy.get(".modal-star-button").eq(3).click(); // index 3 → 별점 8

    // 별 이미지 상태 확인
    cy.get(".modal-star-button").each(($img, index) => {
      const expected = index <= 3 ? "star_filled.png" : "star_empty.png";
      expect($img.attr("src")).to.include(expected);
    });

    // 텍스트 확인
    cy.get(".modal-star-text").should("contain.text", "재미있어요").and("contain.text", "(8/10)");
  });

  it("별점을 클릭하고 새로고침하더라도 사용자가 남긴 별점은 유지된다", () => {
    cy.get(".thumbnail-list > li").first().click();
    cy.wait(500);

    // 별점 클릭
    cy.get(".modal-star-button").eq(4).click(); // index 4 → 별점 10

    cy.get(".close-modal").click();
    cy.reload();

    cy.get(".thumbnail-list > li").first().click();

    // 별 이미지 상태 확인
    cy.get(".modal-star-button").each(($img, index) => {
      const expected = index <= 4 ? "star_filled.png" : "star_empty.png";
      expect($img.attr("src")).to.include(expected);
    });

    // 텍스트 확인
    cy.get(".modal-star-text").should("contain.text", "명작이에요").and("contain.text", "(10/10)");
  });
});
