const createMovie = (id: number) => ({
  id,
  title: `영화 ${id}`,
  poster_path: "/test.jpg",
  backdrop_path: "/bg.jpg",
  vote_average: 8.0,
});

const createPage = (page: number, totalPages: number) => ({
  page,
  total_pages: totalPages,
  results: Array.from({ length: 20 }, (_, i) => createMovie(page * 100 + i)),
});

describe("인기 영화 목록 조회", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  context("첫 화면 진입", () => {
    it("인기 영화 목록이 표시된다", () => {
      cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    });
  });

  context("영화 상세 정보 보기", () => {
    it("카드 클릭 시 스피너가 표시되다가 상세 정보로 전환된다", () => {
      cy.get(".thumbnail-list li").first().click();
      cy.get(".spinner").should("be.visible");
      cy.get(".modal-description").should("be.visible");
    });
  });

  context("스크롤로 다음 페이지 불러오기", () => {
    it("리스트 끝에 도달하면 다음 페이지가 이어서 불러와진다", () => {
      cy.intercept("GET", "**/movie/popular*page=1*", { body: createPage(1, 3) }).as("page1");
      cy.intercept("GET", "**/movie/popular*page=2*", { body: createPage(2, 3) }).as("page2");
      cy.visit("localhost:5173");
      cy.wait("@page1");
      cy.get(".thumbnail-list li").should("have.length", 20);

      cy.get(".scroll-sentinel").scrollIntoView();
      cy.wait("@page2");
      cy.get(".thumbnail-list li").should("have.length", 40);
    });

    it("마지막 페이지에 도달한 이후에는 추가 요청이 일어나지 않는다", () => {
      cy.intercept("GET", "**/movie/popular*page=1*", { body: createPage(1, 2) }).as("page1");
      cy.intercept("GET", "**/movie/popular*page=2*", { body: createPage(2, 2) }).as("page2");
      const extraPageSpy = cy.spy().as("extraPageSpy");
      cy.intercept("GET", "**/movie/popular*page=3*", (req) => {
        extraPageSpy(req);
        req.reply({ body: createPage(3, 2) });
      });

      cy.visit("localhost:5173");
      cy.wait("@page1");
      cy.get(".scroll-sentinel").scrollIntoView();
      cy.wait("@page2");
      cy.get(".thumbnail-list li").should("have.length", 40);

      cy.get(".scroll-sentinel").scrollIntoView();
      cy.wait(500);
      cy.get("@extraPageSpy").should("not.have.been.called");
    });
  });

  context("인기 영화 목록으로 돌아오기", () => {
    beforeEach(() => {
      cy.get(".search-input").type("아이언맨");
      cy.get(".search-form").submit();
      cy.get(".main-title").should("contain.text", "아이언맨");
    });

    it("로고 클릭 시 인기 영화 목록으로 돌아온다", () => {
      cy.get(".logo").click();
      cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
      cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
    });

    it("빈 검색어 제출 시 인기 영화 목록으로 돌아온다", () => {
      cy.get(".search-input").clear();
      cy.get(".search-form").submit();
      cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
      cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
    });
  });
});

describe("영화 검색", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  context("일반 검색어 입력", () => {
    it("검색 결과가 표시된다", () => {
      cy.get(".search-input").type("아이언맨");
      cy.get(".search-form").submit();
      cy.get(".main-title").should("contain.text", "아이언맨");
      cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
    });
  });

  context("결과가 없는 검색어 입력", () => {
    it("검색 결과 없음 안내가 표시된다", () => {
      cy.intercept("GET", "**/search/movie**", {
        body: { results: [], total_pages: 0 },
      }).as("emptySearch");
      cy.get(".search-input").type("없는영화제목");
      cy.get(".search-form").submit();
      cy.wait("@emptySearch");
      cy.get(".result-none-text").should("have.text", "검색 결과가 없습니다.");
    });
  });
});

describe("별점 매기기", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
    cy.get(".thumbnail-list li").first().click();
    cy.get(".modal-description").should("be.visible");
  });

  context("별점을 매기기 전", () => {
    it("평가하기 안내 텍스트가 표시된다", () => {
      cy.get(".rating-label").should("contain.text", "평가하기");
    });
  });

  context("별점을 매긴 후", () => {
    it("별을 클릭하면 별점 라벨이 반영된다", () => {
      cy.get(".star-list label").last().click();
      cy.get(".rating-label").should("contain.text", "최악이에요");
    });

    it("새로고침 후에도 매긴 별점이 유지된다", () => {
      cy.get(".star-list label").last().click();
      cy.get(".rating-label").should("contain.text", "최악이에요");

      cy.get(".close-modal").click();
      cy.reload();
      cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
      cy.get(".thumbnail-list li").first().click();
      cy.get(".modal-description").should("be.visible");
      cy.get(".rating-label").should("contain.text", "최악이에요");
    });
  });
});

describe("에러 케이스", () => {
  context("인기 영화 API 호출 실패", () => {
    it("에러 메시지가 표시된다", () => {
      cy.intercept("GET", "**/movie/popular**", { statusCode: 401 }).as("failedRequest");
      cy.visit("localhost:5173");
      cy.wait("@failedRequest");
      cy.get(".result-none-text").should("be.visible");
    });
  });
});
