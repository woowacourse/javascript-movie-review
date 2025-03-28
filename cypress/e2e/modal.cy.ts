describe("모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.wait(1000);
  });

  it("자세히 보기 버튼 클릭시 헤더에 있는 영화의 디테일 모달창이 열린다.", () => {
    cy.get(".primary").click();

    cy.get(".modal-background").should("have.class", "active");
    cy.get(".top-rated-movie .title")
      .invoke("text")
      .then((text) => {
        cy.get(".modal .main-info h2").invoke("text").should("eq", text);
      });
  });

  it("영화 아이템 클릭시 해당 영화의 디테일 모달창이 열린다.", () => {
    cy.get(".thumbnail-list").children().first().click();

    cy.get(".modal-background").should("have.class", "active");

    cy.get(".thumbnail-list")
      .children("li:first")
      .find(".item-desc strong")
      .invoke("text")
      .then((text) => {
        cy.get(".modal .main-info h2").invoke("text").should("eq", text);
      });
  });

  it("클로즈(X)버튼 클릭시 모달창이 닫힌다.", () => {
    cy.get(".thumbnail-list").children().first().click();

    cy.get(".close-modal").click();

    cy.get(".modal-background").should("not.have.class", "active");
  });

  it("모달 뒷배경 클릭시 모달창이 닫힌다.", () => {
    cy.viewport(1920, 1080);

    cy.get(".thumbnail-list").children().first().click();

    cy.get(".modal-background").click(100, 100);

    cy.get(".modal-background").should("not.have.class", "active");
  });

  it("ESC를 누르면 모달창이 닫힌다.", () => {
    cy.get(".thumbnail-list").children().first().click();

    cy.get("body").type("{esc}");

    cy.get(".modal-background").should("not.have.class", "active");
  });
});
