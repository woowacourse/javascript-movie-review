describe("모달 열기 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular**", { fixture: "movies.json" }).as(
      "getMovies",
    );
    cy.intercept("GET", "**/movie/1001**", { fixture: "moviedetail.json" }).as(
      "getMovieDetail",
    );
    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");
  });

  it("영화 아이템을 클릭하면 모달이 열린다", () => {
    cy.get(".thumbnail-list li").first().find(".item").click();
    cy.wait("@getMovieDetail");
    cy.get("#modalBackground").should("have.class", "active");
    cy.get(".modal-container h2").should("contain", "영화 1");
  });
});

describe("모달 닫기 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular**", { fixture: "movies.json" }).as(
      "getMovies",
    );
    cy.intercept("GET", "**/movie/1001**", { fixture: "moviedetail.json" }).as(
      "getMovieDetail",
    );
    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");
    cy.get(".thumbnail-list li").first().find(".item").click();
    cy.wait("@getMovieDetail");
  });

  it("닫기 버튼 클릭 시 모달이 닫힌다", () => {
    cy.get("#closeModal").click();
    cy.get("#modalBackground").should("not.have.class", "active");
    cy.get(".modal-container").should("not.exist");
  });

  it("Escape 키 입력 시 모달이 닫힌다", () => {
    cy.get("body").type("{esc}");
    cy.get("#modalBackground").should("not.have.class", "active");
    cy.get(".modal-container").should("not.exist");
  });

  it("배경 클릭 시 모달이 닫힌다", () => {
    cy.get("#modalBackground").click({ force: true });
    cy.get("#modalBackground").should("not.have.class", "active");
    cy.get(".modal-container").should("not.exist");
  });
});

describe("모달 반응형 테스트 - 태블릿", () => {
  beforeEach(() => {
    cy.viewport(768, 1024);
    cy.intercept("GET", "**/movie/popular**", { fixture: "movies.json" }).as(
      "getMovies",
    );
    cy.intercept("GET", "**/movie/1001**", { fixture: "moviedetail.json" }).as(
      "getMovieDetail",
    );
    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");
    cy.get(".thumbnail-list li").first().find(".item").click();
    cy.wait("@getMovieDetail");
  });

  it("태블릿 화면에서 모달이 하단 고정으로 표시된다", () => {
    cy.get("#modalBackground").should("have.css", "align-items", "flex-end");
    cy.get(".modal").should("have.css", "width", "768px");
  });

  it("태블릿 화면에서 포스터와 설명이 세로 정렬된다", () => {
    cy.get(".modal-container").should("have.css", "flex-direction", "column");
    cy.get(".modal-image img").should("have.css", "width", "160px");
  });
});

describe("모달 반응형 테스트 - 모바일", () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.intercept("GET", "**/movie/popular**", { fixture: "movies.json" }).as(
      "getMovies",
    );
    cy.intercept("GET", "**/movie/1001**", { fixture: "moviedetail.json" }).as(
      "getMovieDetail",
    );
    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");
    cy.get(".thumbnail-list li").first().find(".item").click();
    cy.wait("@getMovieDetail");
  });

  it("모바일 화면에서 포스터 이미지가 숨겨진다", () => {
    cy.get(".modal-image").should("have.css", "display", "none");
  });
});
