describe("반응형 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.wait(1000);
  });

  it("태블릿 화면(768px)일 때 모달창이 아래로 열린다.(바톰 시트)", () => {
    cy.viewport(768, 1000);

    cy.get(".primary").click();

    cy.get(".modal").then(($element) => {
      const elementBottom = $element[0].getBoundingClientRect().bottom;

      cy.window().then((win) => {
        const height = win.innerHeight;
        expect(Math.abs(elementBottom - height)).to.be.lessThan(1);
      });
    });
  });

  it("모바일 화면(479px)일 때 모달창 내 포스터 이미지가 사라진다.", () => {
    cy.viewport(470, 1000);

    cy.get(".primary").click();

    cy.get(".modal-image img").should("have.css", "display", "none");
  });
});
