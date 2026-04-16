describe("홈 화면 테스트", () => {
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

    cy.visit("http://localhost:5173");
  });

  it("초기 진입 시 영화 목록이 렌더된다.", () => {
    cy.wait("@page1");
    cy.get(".thumbnail-item").should("have.length", 20);
  });

  it("초기 진입 시 베너가 렌더된다.", () => {
    cy.wait("@page1");

    cy.get(".top-rated-movie").should("be.visible");
    cy.get(".title").should("contain", "영화 1");
    cy.get(".rate-value").should("contain", "7.5");
  });

  it("배너의 자세히 보기 버튼 클릭 시 모달이 열린다.", () => {
    cy.wait("@page1");

    cy.get(".top-rated-movie .detail").click();
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".modal").should("be.visible");
  });
});

describe("영화 리스트 기능 테스트", () => {
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

    cy.intercept("GET", "**/movie/popular?language=ko-KR&region=KR&page=2", {
      statusCode: 200,
      body: {
        page: 2,
        results: Array.from({ length: 20 }, (_, index) => ({
          id: index + 21,
          title: `영화 ${index + 21}`,
          poster_path: `/poster-${index + 21}.jpg`,
          vote_average: 8.1,
        })),
        total_pages: 2,
        total_results: 40,
      },
    }).as("page2");

    cy.visit("http://localhost:5173");
  });

  it("영화 카드 클릭 시 모달이 열린다.", () => {
    cy.wait("@page1");

    cy.get(".item").first().click();
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".modal").should("be.visible");
  });

  it("무한 스크롤 시 다음 페이지가 붙는다.", () => {
    cy.wait("@page1");
    cy.get(".thumbnail-item").should("have.length", 20);

    cy.get("#sentinel").scrollIntoView();
    cy.wait("@page2");

    cy.get(".thumbnail-item").should("have.length", 40);
  });
});
