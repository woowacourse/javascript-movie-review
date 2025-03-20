const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("search 테스트", () => {
  beforeEach(() => {
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
        }
      }
    );
    cy.visit(localHostUrl);
  });

  it("키워드를 검색하면 키워드가 포함된 영화가 보인다.", () => {
    const searchValue = "짱구";
    cy.get(".search-bar").type(`${searchValue}{enter}`);

    cy.get("#thumbnail-list > li").each(($li) => {
      cy.wrap($li).should("contain.text", searchValue);
    });
    cy.get("#load-more").scrollIntoView();
    cy.get("#load-more").click();
    cy.get("#thumbnail-list > li").each(($li) => {
      cy.wrap($li).should("contain.text", "짱구");
    });
  });

  it("검색된 영화가 20개 이상이면 더보기 버튼이 활성화 된다.", () => {
    const searchValue = "짱구";
    cy.get(".search-bar").type(`${searchValue}{enter}`);
    cy.get("#thumbnail-list > li").should("have.length", 20);
    cy.get("#load-more").scrollIntoView().should("be.visible");
  });

  it("더보기 버튼을 누르면 나머지 영화 데이터를 가져온다.", () => {
    const searchValue = "짱구";
    cy.get(".search-bar").type(`${searchValue}{enter}`);
    cy.get("#load-more").scrollIntoView().should("be.visible").click();
    cy.get("#thumbnail-list > li").should("have.length", 35);
  });

  it("더 불러올 수 있는 영화가 없으면 더보기 버튼이 사라진다", () => {
    const searchValue = "짱구";
    cy.get(".search-bar").type(`${searchValue}{enter}`);
    cy.get("#load-more").scrollIntoView().should("be.visible").click();
    cy.get("#thumbnail-list > li").should("have.length", 35);
    cy.get(".footer").scrollIntoView();
    cy.get("#load-more").should("not.be.visible");
  });
});
