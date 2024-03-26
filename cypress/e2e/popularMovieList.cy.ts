describe("인기있는 영화 목록 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      {
        fixture: "popular-movie-list.json",
        delay: 2000,
      }
    ).as("getPopularMovies");

    cy.visit("http://localhost:8080");
    cy.wait("@getPopularMovies");
  });

  context("초기 렌더링 테스트", () => {
    it("처음 페이지를 방문하면 header와 main으로 레이아웃이 구성된다.", () => {
      cy.get("header").should("be.visible");
      cy.get("main").should("be.visible");
    });

    it("header는 home icon과 search box로 구성된다.", () => {
      cy.get("header > h1 > img[alt='MovieList 로고']").should("be.visible");
      cy.get("header > form.search-box > input[name='query']").should(
        "be.visible"
      );
      cy.get("header > form.search-box > button.search-button").should(
        "be.visible"
      );
    });

    it("main은 지금 인기있는 영화 섹션으로 구성된다.", () => {
      cy.get("main > section.item-view").should("be.visible");
    });
  });

  context("지금 인기있는 영화 섹션 렌더링 테스트", () => {
    it("지금 인기있는 영화 섹션은 h2(title), ul(movie list), button(more button)으로 구성된다.", () => {
      cy.get("main > section.item-view > h2").should("be.visible");
      cy.get("main > section.item-view > ul").should("be.visible");
      cy.get("main > section.item-view > button").should("be.visible");
    });

    it("ul(movie list)는 20개의 li로 구성된다.", () => {
      cy.get("main > section.item-view > ul > li").should("have.length", 20);
    });

    it("li 내부는 a > div(item-card)로 구성되고, item-card는 img(thumbnail), p(title), p(score)로 구성된다.", () => {
      cy.get(
        "main > section.item-view > ul > li > a > div.item-card > img.item-thumbnail"
      ).should("be.visible");
      cy.get(
        "main > section.item-view > ul > li > a > div.item-card > p.item-title"
      ).should("be.visible");
      cy.get(
        "main > section.item-view > ul > li > a > div.item-card > p.item-score"
      ).should("be.visible");
    });
  });

  context("더 보기 버튼 click 테스트", () => {
    it("button(more button)을 click하면, button은 비활성화되고, 20개의 skeleton UI 아이템이 생성된다.", () => {
      cy.get("section.item-view > button").click();
      cy.get("section.item-view > button").should("have.class", "disabled");
      cy.get(
        "section.item-view > ul > li > a > div.item-card > p.item-title.skeleton"
      ).should("have.length", 20);
    });

    it("button(more button)을 click해서 인기있는 영화 목록을 불러오면, button은 활성화되고, skeleton UI 아이템이 영화 아이템으로 변한다.", () => {
      cy.get("section.item-view > button").click();
      cy.wait("@getPopularMovies");
      cy.get("section.item-view > button").should("not.have.class", "disabled");
      cy.get("section.item-view > ul > li").should("have.length", 40);
      cy.get(
        "section.item-view > ul > li > a > div.item-card > p.item-title.skeleton"
      ).should("have.length", 0);
    });
  });
});
