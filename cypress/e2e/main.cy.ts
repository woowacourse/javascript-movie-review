const mockMovies = (count: number, page: number, totalPages: number) => ({
  results: Array.from({ length: count }, (_, i) => ({
    id: i + (page - 1) * 20 + 1,
    title: `인기 영화 ${i + (page - 1) * 20 + 1}`,
    poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
    vote_average: 8.5,
  })),
  page,
  total_pages: totalPages,
});

const mockMovieDetail = {
  id: 1,
  title: "인기 영화 1",
  overview: "줄거리",
  vote_average: 8.5,
  poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
  release_date: "2024-06-14",
  genres: [{ name: "애니메이션" }, { name: "가족" }],
};

describe("최초 진입 시나리오 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular?*page=1*", mockMovies(20, 1, 3)).as(
      "getPage1",
    );
    cy.intercept("GET", "**/movie/popular?*page=2*", mockMovies(20, 2, 3)).as(
      "getPage2",
    );
    cy.intercept("GET", "**/movie/popular?*page=3*", mockMovies(10, 3, 3)).as(
      "getPage3",
    );
    cy.visit("http://localhost:5173/");
  });

  it("1. 배너에 첫 번째 인기 영화의 정보가 표시된다.", () => {
    cy.wait("@getPage1");

    cy.get(".thumbnail-list li:first-child")
      .find("strong")
      .invoke("text")
      .then((firstMovieTitle) => {
        cy.get(".title").invoke("text").should("eq", firstMovieTitle);
      });
  });

  it("2. 최초 진입 시 인기 영화 20개가 표시된다.", () => {
    cy.wait("@getPage1");

    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("3. 스크롤을 내리면 다음 20개가 자동으로 추가된다.", () => {
    cy.wait("@getPage1");
    cy.get(".thumbnail-list li").should("have.length", 20);

    cy.scrollTo("bottom");
    cy.wait("@getPage2");

    cy.get(".thumbnail-list li").should("have.length", 40);
  });

  it("4. 연속 스크롤 시 다음 페이지가 순차적으로 추가된다.", () => {
    cy.wait("@getPage1");

    cy.scrollTo("bottom");
    cy.wait("@getPage2");

    cy.scrollTo("bottom");
    cy.wait("@getPage3");

    cy.get(".thumbnail-list li").should("have.length", 50);
  });

  describe("5. 영화를 클릭하면 모달이 열린다.", () => {
    beforeEach(() => {
      cy.wait("@getPage1");
      cy.intercept("GET", "**/movie/*?language=ko-KR", {
        delay: 500,
        body: mockMovieDetail,
      }).as("getDetail");
      cy.get(".thumbnail-list .item").first().click();
    });

    it("클릭 즉시 모달이 열리고, API 응답 전까지 콘텐츠가 비어있다.", () => {
      cy.get(".modal-background").should("have.class", "active");
      cy.get(".modal-header h2").should("have.text", "");
    });

    it("API 응답 후 모달에 제목, 카테고리, 평점, 줄거리가 채워진다.", () => {
      cy.wait("@getDetail");

      cy.get(".modal-header h2").should(
        "have.text",
        mockMovieDetail.title,
      );
      cy.get(".modal-description .category")
        .should("contain.text", "2024")
        .and("contain.text", "애니메이션");
      cy.get(".modal-description .rate span").should(
        "have.text",
        String(mockMovieDetail.vote_average),
      );
      cy.get(".modal-description .detail").should(
        "have.text",
        mockMovieDetail.overview,
      );
    });

    it("모달이 열리면 body 스크롤이 방지된다.", () => {
      cy.get("body").should("have.css", "overflow", "hidden");
    });

    it("X 버튼을 누르면 모달이 닫힌다.", () => {
      cy.wait("@getDetail");
      cy.get(".close-modal").click();

      cy.get(".modal-background").should("not.have.class", "active");
      cy.get("body").should("not.have.css", "overflow", "hidden");
    });

    it("ESC 키를 누르면 모달이 닫힌다.", () => {
      cy.wait("@getDetail");
      cy.get("body").type("{esc}");

      cy.get(".modal-background").should("not.have.class", "active");
    });

    it("배경(딤 영역)을 클릭하면 모달이 닫힌다.", () => {
      cy.wait("@getDetail");
      cy.get(".modal-background").click({ force: true });

      cy.get(".modal-background").should("not.have.class", "active");
    });
  });

  describe("6. 반응형 레이아웃", () => {
    beforeEach(() => {
      cy.wait("@getPage1");
    });

    it("모바일(375px)에서 영화 목록이 1열로 표시된다.", () => {
      cy.viewport(375, 812);

      cy.get(".thumbnail-list li")
        .eq(0)
        .then(($first) => {
          cy.get(".thumbnail-list li")
            .eq(1)
            .then(($second) => {
              expect($second[0].getBoundingClientRect().top).to.be.greaterThan(
                $first[0].getBoundingClientRect().top,
              );
            });
        });
    });

    it("태블릿(900px)에서 영화 목록이 3열로 표시된다.", () => {
      cy.viewport(900, 900);

      cy.get(".thumbnail-list li").then(($items) => {
        const firstTop = $items[0].getBoundingClientRect().top;
        const thirdTop = $items[2].getBoundingClientRect().top;
        const fourthTop = $items[3].getBoundingClientRect().top;

        expect(thirdTop).to.be.closeTo(firstTop, 5);
        expect(fourthTop).to.be.greaterThan(firstTop);
      });
    });

    it("데스크톱(1200px)에서 영화 목록이 4열로 표시된다.", () => {
      cy.viewport(1200, 900);

      cy.get(".thumbnail-list li").then(($items) => {
        const firstTop = $items[0].getBoundingClientRect().top;
        const fourthTop = $items[3].getBoundingClientRect().top;
        const fifthTop = $items[4].getBoundingClientRect().top;

        expect(fourthTop).to.be.closeTo(firstTop, 5);
        expect(fifthTop).to.be.greaterThan(firstTop);
      });
    });

    it("와이드(1600px)에서 영화 목록이 5열로 표시된다.", () => {
      cy.viewport(1600, 900);

      cy.get(".thumbnail-list li").then(($items) => {
        const firstTop = $items[0].getBoundingClientRect().top;
        const fifthTop = $items[4].getBoundingClientRect().top;
        const sixthTop = $items[5].getBoundingClientRect().top;

        expect(fifthTop).to.be.closeTo(firstTop, 5);
        expect(sixthTop).to.be.greaterThan(firstTop);
      });
    });

    it("모바일(375px)에서 모달의 포스터 이미지가 숨겨진다.", () => {
      cy.viewport(375, 812);

      cy.intercept("GET", "**/movie/*?language=ko-KR", mockMovieDetail).as(
        "getDetail",
      );
      cy.get(".thumbnail-list .item").first().click();
      cy.wait("@getDetail");

      cy.get(".modal-image").should("not.be.visible");
    });

    it("태블릿(900px)에서 모달이 하단 시트 형태로 표시된다.", () => {
      cy.viewport(900, 900);

      cy.intercept("GET", "**/movie/*?language=ko-KR", mockMovieDetail).as(
        "getDetail",
      );
      cy.get(".thumbnail-list .item").first().click();
      cy.wait("@getDetail");

      cy.get(".modal").then(($modal) => {
        cy.window().then((win) => {
          expect($modal[0].getBoundingClientRect().bottom).to.be.closeTo(
            win.innerHeight,
            5,
          );
        });
      });
    });
  });
});
