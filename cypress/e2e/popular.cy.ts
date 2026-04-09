import { LOAD_MORE_BTN } from "./search.cy";

describe("인기 영화 목록", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular*", { fixture: "popular.json" }).as(
      "getPopular",
    );
    cy.visit("/");
    cy.wait("@getPopular");
  });

  it("초기 진입 시 영화 카드 20개가 렌더링된다", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("각 영화 카드에 제목과 평점이 표시된다", () => {
    cy.get(".thumbnail-list li")
      .first()
      .within(() => {
        cy.get("strong").should("not.be.empty");
        cy.get(".rate span").should("not.be.empty");
      });
  });

  it("더 보기 버튼이 렌더링된다", () => {
    cy.get(LOAD_MORE_BTN).should("be.visible");
  });

  it("더 보기 버튼 클릭 시 다음 페이지 영화를 추가로 불러온다", () => {
    cy.intercept("GET", "**/movie/popular*page=2*", {
      fixture: "popular-page2.json",
    }).as("getPopularPage2");

    cy.get(LOAD_MORE_BTN).click();
    cy.wait("@getPopularPage2");

    cy.get(".thumbnail-list li").should("have.length", 40);
  });

  it("더 보기 버튼 클릭 중에는 버튼이 비활성화된다", () => {
    cy.intercept("GET", "**/movie/popular*page=2*", (req) => {
      req.reply({ fixture: "popular-page2.json", delay: 500 });
    }).as("getPopularPage2");

    cy.get(LOAD_MORE_BTN).click();
    cy.get(LOAD_MORE_BTN).should("be.disabled");

    cy.wait("@getPopularPage2");
    cy.get(LOAD_MORE_BTN).should("not.be.disabled");
  });

  it("마지막 페이지에서는 더 보기 버튼이 숨겨진다", () => {
    cy.intercept("GET", "**/movie/popular*", {
      body: {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [
          {
            id: 1,
            title: "테스트 마지막 영화",
            poster_path: "/test.jpg",
            vote_average: 7.0,
            adult: false,
            backdrop_path: "/test.jpg",
            genre_ids: [28],
            original_language: "ko",
            original_title: "Test Movie",
            overview: "",
            popularity: 100,
            release_date: "2024-01-01",
            video: false,
            vote_count: 100,
          },
        ],
      },
    }).as("getLastPage");

    cy.visit("/");
    cy.wait("@getLastPage");

    cy.get(LOAD_MORE_BTN).should("have.class", "hidden");
  });
});
