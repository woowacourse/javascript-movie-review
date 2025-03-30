beforeEach(() => {
  cy.intercept(
    {
      method: "GET",
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
    },
    { fixture: "movie-popular-page1.json" }
  ).as("getPopularMoviesPage1");

  cy.visit("http://localhost:5173/");

  cy.intercept(
    {
      method: "GET",
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*page=2/,
    },
    { fixture: "movie-popular-page2.json" }
  ).as("getPopularMoviesPage2");
});

describe("Fixture을 리용한 모달 E2E테스트 - step2", () => {
  beforeEach(() => {
    cy.wait("@getPopularMoviesPage1").then((interception) => {
      if (!interception.response) return;

      cy.get(".item").first().click();
      cy.get(".modal").should("be.visible");
      cy.get(".movie-description-container h2").should(
        "contain.text",
        "백설공주"
      );
    });
  });

  it("영화 정보 클릭 시 해당 영화 정보를 가지고 있는 모달창이 열리고, esc 키를 누르면 모달이 닫힌다.", () => {
    cy.get("body").type("{esc}");
    cy.get(".modal").should("not.visible");
  });

  it("영화 정보 클릭 시 해당 영화 정보를 가지고 있는 모달창이 열리고, 닫기 버튼을 누르면 모달이 닫힌다.", () => {
    cy.get(".close-modal").click();
    cy.get(".modal").should("not.visible");
  });

  it("영화 정보를 가지고 있는 모달창에서 '내별점'을 선택할 수 있고, 모달창을 다시 열었을 때 이전에 선택된 '내별점'값이 그대로 존재한다.", () => {
    cy.get(".personal-rate .star").eq(3).click();

    cy.get(".rating-message").should("contain.text", "재미있어요");

    cy.get("body").type("{esc}");

    cy.get(".modal").should("not.visible");
    cy.get(".item").first().click();

    cy.get(".personal-rate .star[src='./images/star_filled.png']").should(
      "have.length",
      4
    );

    cy.get(".rating-message").should("contain.text", "재미있어요");
  });
});

describe("Fixture을 이용한 목록 모킹 테스트 - step2", () => {
  it("스크롤을 내렸을 때 다음 목록이 자동으로 보여진다.", () => {
    cy.wait("@getPopularMoviesPage1");

    cy.scrollTo("bottom");

    cy.wait("@getPopularMoviesPage2");
    cy.get(".thumbnail-list > li").should("have.length", 40);
  });
});
