describe("영화 리뷰 웹 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
    cy.get(".search-input").should("not.be.disabled");
  });

  // 1. 모달 표시
  it("영화 포스터 클릭 시 모달 창이 표시된다", () => {
    cy.get(".thumbnail-list li").first().find(".thumbnail").click();
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".modal-title").should("be.visible");
  });

  it("영화 제목 클릭 시 모달 창이 표시된다", () => {
    cy.get(".thumbnail-list li").first().find("strong").click();
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".modal-title").should("be.visible");
  });

  // 2. 닫기 버튼으로 모달 닫기
  it("닫기 버튼 클릭 시 모달이 닫힌다", () => {
    cy.get(".thumbnail-list li").first().find(".thumbnail").click();
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".close-modal").click();
    cy.get(".modal-background").should("not.have.class", "active");
  });

  // 3. ESC 키로 모달 닫기
  it("ESC 키 입력 시 모달이 닫힌다", () => {
    cy.get(".thumbnail-list li").first().find(".thumbnail").click();
    cy.get(".modal-background").should("have.class", "active");
    cy.get("body").type("{esc}");
    cy.get(".modal-background").should("not.have.class", "active");
  });

  // 별점 테스트
  it("별점 부여 후 새로고침 시 별점이 유지된다", () => {
    cy.get(".thumbnail-list li").first().find(".thumbnail").click();
    cy.get(".modal-background").should("have.class", "active");

    cy.get(".modal-star[data-index='4']").click();
    cy.get(".rating-label").should("have.text", "재미있어요");
    cy.get(".rating-score").should("have.text", "(8/10)");

    cy.get(".close-modal").click();
    cy.reload();
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);

    cy.get(".thumbnail-list li").first().find(".thumbnail").click();
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".rating-label").should("have.text", "재미있어요");
    cy.get(".rating-score").should("have.text", "(8/10)");
  });

  // 무한 스크롤 테스트
  it("화면 끝에 도달하면 추가 영화가 로드된다", () => {
    cy.intercept("GET", /movie\/popular/).as("loadMore");

    cy.get(".thumbnail-list li")
      .its("length")
      .then((before) => {
        cy.get(".scroll-sentinel").scrollIntoView();
        cy.wait("@loadMore", { timeout: 8000 });
        cy.get(".thumbnail-list li").should("have.length.greaterThan", before);
      });
  });

  it("초기 진입 시 인기영화 목록이 표시된다", () => {
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("검색어 입력 시 검색 결과가 표시된다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("빈 검색어 제출 시 인기영화로 돌아온다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");

    cy.get(".search-input").clear();
    cy.get(".search-form").submit();
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("로고 클릭 시 홈으로 돌아온다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");

    cy.get(".logo").click();
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });
});
