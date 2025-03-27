import { ERROR_MESSAGE } from "../../src/setting/ErrorMessage";

const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("홈 화면 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      (req) => {
        if (req.query.page === "1" && req.query.query === "짱구") {
          req.reply({ fixture: "jjanggu-search1.json" });
        } else if (req.query.page === "2" && req.query.query === "짱구") {
          req.reply({ fixture: "jjanggu-search2.json" });
        } else if (req.query.page === "1" && req.query.query === "강아지") {
          req.reply({ fixture: "dog-search1.json" });
        } else if (req.query.page === "2" && req.query.query === "강아지") {
          req.reply({ fixture: "dog-search2.json" });
        }
      }
    );
    cy.visit(localHostUrl);
  });

  // 서로간 테스트가 의존성이 있는 이 테스트(어떻게 보면 통합 테스트?)가 자주 통과 못해서, 손으로 직접 테스트를 했던 코드입니다.
  // 그러나 계속해서 직접 사용자가 테스트 하듯이 이렇게 테스트 하면 귀찮으니, 추가 했습니다.
  // 코스트가 크니 기본값은 스킵입니다.

  it("파이널 테스트(코스트가 크니 기본값은 스킵)", () => {
    const firstIllegalSearchValue = "미친 오토바이 삼인방";
    cy.get(".search-bar").type(`${firstIllegalSearchValue}{enter}`);

    cy.get("#fallback").should("be.visible").contains("검색 결과가 없습니다.");
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.NO_DATA);

    const firstLegalSearchValue = "짱구";
    cy.get(".search-bar").clear();
    cy.get(".search-bar").type(`${firstLegalSearchValue}{enter}`);

    cy.scrollTo("bottom");
    cy.wait(1000);
    cy.get("#thumbnail-list > li").should("have.length", 35);

    cy.get("#thumbnail-list > li").each(($li) => {
      cy.wrap($li).should("contain.text", firstLegalSearchValue);
    });
    const illegalSearchValue = "고양이 땅콩 수집가";
    cy.get(".search-bar").clear();
    cy.get(".search-bar").type(`${illegalSearchValue}{enter}`);

    cy.get("#fallback").should("be.visible").contains("검색 결과가 없습니다.");
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.NO_DATA);

    const secondLegalSearchValue = "강아지";
    cy.get(".search-bar").clear();
    cy.get(".search-bar").type(`${secondLegalSearchValue}{enter}`);

    cy.get("#thumbnail-list > li").each(($li) => {
      cy.wrap($li).should("contain.text", secondLegalSearchValue);
    });

    cy.scrollTo("bottom");
    cy.wait(1000);
    cy.get("#thumbnail-list > li").should("have.length", 22);

    cy.get("#thumbnail-list > li").each(($li) => {
      cy.wrap($li).should("contain.text", "강아지");
    });

    cy.get("#logo").click();
    cy.wait(1000);
    cy.get("#thumbnail-list > li").should("have.length", 20);
  });
});
