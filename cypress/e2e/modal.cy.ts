describe("모달 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular?language=ko-KR&region=KR&page=1", {
      statusCode: 200,
      body: {
        page: 1,
        results: Array.from({ length: 20 }, (_, index) => ({
          id: index + 1,
          title: `영화 ${index + 1}`,
          poster_path: `/poster-${index + 1}.jpg`,
          vote_average: 7.5,
        })),
        total_pages: 2,
        total_results: 40,
      },
    }).as("page1");

    cy.intercept("GET", "**/movie/1?language=ko-KR&region=KR", {
      statusCode: 200,
      body: {
        id: 1,
        title: "영화 1",
        poster_path: "/poster-1.jpg",
        vote_average: 7.5,
        release_date: "2024-01-01",
        genres: [
          { id: 1, name: "액션" },
          { id: 2, name: "모험" },
        ],
        overview: "영화 1의 줄거리입니다.",
      },
    }).as("movieDetail");

    cy.visit("http://localhost:5173");
    cy.wait("@page1");
    cy.get(".top-rated-movie .detail").click();
    cy.wait("@movieDetail");
  });

  it("모달이 열리면 상세정보가 렌더된다.", () => {
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".modal").should("be.visible");
    cy.get(".modal .modal-title-section h2").should("contain", "영화 1");
    cy.get(".modal .detail").should("contain", "영화 1의 줄거리입니다.");
  });

  it("x 버튼을 누르면 모달이 닫힌다.", () => {
    cy.get(".close-modal").click();
    cy.get(".modal-background").should("not.have.class", "active");
    cy.get(".modal").should("not.be.visible");
  });

  it("esc 버튼을 누르면 모달이 닫힌다.", () => {
    cy.get("body").type("{esc}");
    cy.get(".modal-background").should("not.have.class", "active");
    cy.get(".modal").should("not.be.visible");
  });

  it("모달 바깥을 누르면 모달이 닫힌다.", () => {
    cy.get(".modal-background").click("topLeft");
    cy.get(".modal-background").should("not.have.class", "active");
    cy.get(".modal").should("not.be.visible");
  });

  it("처음 모달이 열리면 별점 초기값이 보인다.", () => {
    cy.get(".myrate-comment").should("contain", "별점을 입력해주세요");
    cy.get(".myrate-score").should("contain", "(0/10)");
  });

  it("3번째 별을 클릭하면 별점이 반영된다.", () => {
    cy.get(".myrate-stars img").eq(2).click();
    cy.get(".myrate-comment").should("contain", "보통이에요");
    cy.get(".myrate-score").should("contain", "(6/10)");
  });
});
