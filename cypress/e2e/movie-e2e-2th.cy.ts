describe("모달창 확인", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);
  });

  it("영화 아이템을 클릭하면 모달 창이 뜬다.", () => {
    cy.get("movie-item").first().click();

    cy.get("movie-modal").should("exist");
    cy.url().should("contain", "/movie");
  });

  it("모달이 뜬 상태에서 닫기 버튼을 누르면 모달이 닫힌다.", () => {
    cy.get("movie-item").first().click();
    cy.get("movie-modal").find(".movie-modal-close").click();

    cy.get("movie-modal").should("not.exist");
    cy.url().should("eq", "http://localhost:8081/");
  });

  it("모달이 뜬 상태에서 뒤로가기를 누르면 메인 화면으로 이동한다.", () => {
    cy.get("movie-item").first().click();
    cy.go("back");

    cy.get("movie-modal").should("not.exist");
    cy.url().should("eq", "http://localhost:8081/");
  });

  it("모달이 뜬 상태에서 백스페이스를 누르면 메인 화면으로 이동한다.", () => {
    cy.get("movie-item").first().click();
    cy.get("movie-modal").trigger("keyup", { key: "Backspace" });

    cy.get("movie-modal").should("not.exist");
    cy.url().should("eq", "http://localhost:8081/");
  });

  it("모달이 뜬 상태에서 뒤로가기를 눌러 메인화면으로 이동한 후 다시 앞으로 가기를 누르면 모달이 다시 뜬다.", () => {
    cy.get("movie-item").first().click();
    cy.go("back");

    cy.go("forward");
    cy.get("movie-modal").should("exist");
    cy.url().should("contain", "/movie");
  });

  it("모달창을 열고 별점을 누르면 새로고침 후에도 유지된다.", () => {
    cy.get("movie-item").first().click();

    cy.get("#score-5").click();

    cy.reload();

    cy.get("movie-item").first().click({ force: true });
    cy.get("#movie-modal-score").contains("10");
  });
});

describe("무한 스크롤 확인", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1920, 1080);
  });
  it("인기 영화 리스트에서 아래로 스크롤 내리면 리스트가 추가된다.", () => {});

  it("전쟁을 검색하고 리스트에서 아래로 스크롤 내리면 리스트가 추가된다.", () => {});
});

describe("반응형 확인", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(390, 844);
  });
  it("모바일 환경에서 검색 버튼을 누르고 입력창이 뜨면, 전쟁을 입력하면 전쟁에 대한 검색 결과가 나온다.", () => {});
});
