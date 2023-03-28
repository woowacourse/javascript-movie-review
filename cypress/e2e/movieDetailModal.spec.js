describe("영화 리뷰 애플리케이션 영화 디테일(모달) 관련 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("localhost:8080");

    cy.wait("@getPopularMovies");
  });

  it("영화를 눌렀을 때 모달이 보여야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".modal-container").should("be.visible");
  });

  it("모달의 우측 상단에 위치한 닫기 버튼을 눌렀을 때 모달이 닫혀야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".close-button").click();
    cy.get(".modal-container").should("not.be.visible");
  });

  it("모달이 열려있을 때 바깥 영역을 누르면 모달이 닫혀야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get("body").click(0, 0);
    cy.get(".modal-container").should("not.be.visible");
  });

  it("모달이 열려있을 때 별점을 등록 가능해야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".user-rate-container img").first().click();
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
  });

  it("모달이 열려있을 때 별점을 등록 후 다시 진입 시 남긴 별점이 있어야 한다..", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".user-rate-container img").first().click();
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
    cy.get("body").click(0, 0);
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
  });

  it("등록한 별점과 같은 별점을 누르면 별점 등록이 초기화 되어야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".user-rate-container img").first().click();
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
    cy.get(".user-rate-container img").first().click();
    cy.get(".score-comment").should("not.have.text", "최악이예요");
  });

  it("등록한 별점과 다른 별점을 누르면 별점이 바뀌어야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".user-rate-container img").first().click();
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
    cy.get(".user-rate-container img").eq(3).click();
    cy.get(".score").should("have.text", "8");
    cy.get(".score-comment").should("have.text", "재미있어요");
  });
});
