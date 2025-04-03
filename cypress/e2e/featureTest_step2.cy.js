describe("2단계 - 영화 리뷰 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?api_key=*&language=ko-KR&page=1",
      { fixture: "popular_movies_page1.json" },
    ).as("getPopularMoviesPage1");

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?api_key=*&language=ko-KR&page=2",
      { fixture: "popular_movies_page2.json" },
    ).as("getPopularMoviesPage2");

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/search/movie?api_key=*&language=ko-KR&query=%EC%A7%B1%EA%B5%AC&page=1",
      { fixture: "search_movies_page1.json" },
    ).as("getSearchPage1");

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/search/movie?api_key=*&language=ko-KR&query=%EC%A7%B1%EA%B5%AC&page=2",
      { fixture: "search_movies_page2.json" },
    ).as("getSearchPage2");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie(?!.*query=%EC%A7%B1%EA%B5%AC)/,
      },
      { fixture: "no_results.json" },
    ).as("getNoResults");

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/447273?api_key=*&language=ko-KR",
      { fixture: "snow_white_detail.json" }
    ).as("getSnowWhiteDetail");

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/1221404?api_key=*&language=ko-KR",
      { fixture: "shinchang_detail.json" }
    ).as("getShinchangDetail");

    cy.visit("http://localhost:5173");
    cy.viewport(1024, 1024);
  });


  describe('영화 상세정보 모달', () => {
    context("영화 포스터 또는 제목을 클릭 했을 때", () => {
      it("인기 영화를 클릭하면 해당 영화 상세 정보 모달 창이 뜬다", () => {
        // 인기 영화 API 대기
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .should("contain.text", "Snow White")
          .contains("Snow White")
          .click();

        // 상세 정보 API 대기
        cy.wait("@getSnowWhiteDetail");

        // 모달이 보이는지 확인
        cy.get(".modal-background").should("be.visible");
        cy.get(".modal").should("contain.text", "Snow White");

        cy.get(".modal").should("be.visible");
        cy.get(".close-modal").click();
      });

      it("영화 검색후 영화를 클릭하면 해당 영화 상세 정보 모달 창이 뜬다", () => {
        cy.get(".search-bar-input").type("짱구");
        cy.get(".search-bar-button").click();

        // API 완료 기다림
        cy.wait("@getSearchPage1");

        // 실제 검색 결과로 DOM이 바뀔 때까지 대기
        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .should("contain.text", "극장판 짱구는 못말려")
          .contains("극장판 짱구는 못말려")
          .click();

        // 짱구 상세 API 기다림
        cy.wait("@getShinchangDetail");

        // 모달 확인
        cy.get(".modal").should("be.visible");
        cy.get(".modal").should("contain.text", "극장판 짱구는 못말려");

        cy.get(".modal").should("be.visible");
        cy.get(".close-modal").click();
      });
    });

    context('모달이 열린 상태일 때', () => {
      it("닫기 버튼을 누르면 모달 창이 닫힌다", () => {
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .should("contain.text", "Snow White")
          .contains("Snow White")
          .click();

        cy.wait("@getSnowWhiteDetail");

        cy.get(".modal").should("be.visible");
        cy.get(".close-modal").click();

        cy.get(".modal").should("not.exist");
      });

      it("ESC 버튼을 누르면 모달 창이 닫힌다", () => {
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .first()
          .click();

        cy.wait("@getSnowWhiteDetail");

        cy.get("body").type("{esc}"); // ESC 키 입력
        cy.get(".modal").should("not.exist");
      });

      it("모달 창 바깥을 클릭하면 모달 창이 닫힌다", () => {
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .first()
          .click();

        cy.wait("@getSnowWhiteDetail");

        // 모달 바깥 영역 클릭
        cy.get(".modal-background").click("topLeft");

        cy.get(".modal").should("not.exist");
      });
    });
  })

  describe('별점 테스트', () => {
    context("모달에 있는 별을 클릭했을 때", () => {
      it("클릭한 칸만큼 별이 채워지고 문구가 추가된다", () => {
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .contains("Snow White")
          .click();

        cy.wait("@getSnowWhiteDetail");

        // 네 번째 별 클릭 (data-value="4", → 8점)
        cy.get('.user-rating .star[data-value="4"]').click({ force: true });

        // 문구 확인 (8점 → 재미있어요)
        cy.get(".rating-message").should("contain.text", "재미있어요");

        cy.get("body").type("{esc}"); // ESC 키 입력
        cy.get(".modal").should("not.exist");
      });
    })

    context('별점을 준 후 새로고침 했을 때', () => {
      it("상세정보 모달에서 저장된 별점을 볼 수 있다", () => {
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .contains("Snow White")
          .click();

        cy.wait("@getSnowWhiteDetail");

        // 다섯 번째 별 클릭 (data-value="5", → 10점)
        cy.get('.user-rating .star[data-value="5"]').click({ force: true });

        cy.get(".rating-message").should("contain.text", "명작이에요");

        // 새로고침
        cy.reload();

        cy.wait("@getPopularMoviesPage1");

        // 다시 영화 클릭
        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .contains("Snow White")
          .click();

        cy.wait("@getSnowWhiteDetail");

        // 선택된 별 확인 (data-value="5"번 별이 filled 상태인지 확인)
        cy.get('.user-rating .star[data-value="5"]')
          .should("have.attr", "src")
          .and("include", "star_filled");

        // 문구도 유지되는지 확인
        cy.get(".rating-message").should("contain.text", "명작이에요");

        cy.get("body").type("{esc}"); // ESC 키 입력
        cy.get(".modal").should("not.exist");
      });
    })
  })

  describe('무한 스크롤 테스트', () => {
    context('지금 인기 있는 영화 리스트에서', () => {
      it("스크롤을 리스트의 끝으로 내리면 영화 20개가 추가된다", () => {
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .should("have.length", 20);

        // 스크롤 이벤트 발생 (리스트 하단으로)
        cy.scrollTo("bottom");

        // 두 번째 페이지 API 대기
        cy.wait("@getPopularMoviesPage2");

        // 총 40개 렌더링 되었는지 확인
        cy.get(".thumbnail-list li:not(.skeleton-card)").should("have.length", 40);
      });
    });

    context('영화 검색 결과 리스트에서', () => {
      it("스크롤을 리스트의 끝으로 내리면 영화 20개가 추가된다", () => {
        cy.get(".search-bar-input").type("짱구");
        cy.get(".search-bar-button").click();

        cy.wait("@getSearchPage1");

        cy.get(".thumbnail-list li:not(.skeleton-card)", { timeout: 10000 })
          .should("have.length", 20);

        cy.scrollTo("bottom");

        cy.wait("@getSearchPage2");

        cy.get(".thumbnail-list li:not(.skeleton-card)").should("have.length.gt", 20);
        cy.get(".thumbnail-list li:not(.skeleton-card)").should("have.length.lte", 40);
      });
    });
  })

  describe('반응형 테스트', () => {
    context('화면 너비가 1440px 이상일 때', () => {
      it("영화 리스트가 한 줄에 4개로 표시된다.", () => {
        cy.viewport(1440, 900);
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list")
          .invoke("css", "grid-template-columns")
          .then((gridValue) => {
            const columns = gridValue.trim().split(" ");
            expect(columns).to.have.length(4);
            columns.forEach((col) => {
              expect(col).to.equal("200px");
            });
          });
      });
    });

    context('화면 너비가 1024px 이상일 때', () => {
      it("영화 리스트가 한 줄에 3개로 표시된다.", () => {
        cy.viewport(1024, 900);
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list")
          .invoke("css", "grid-template-columns")
          .then((gridValue) => {
            const columns = gridValue.trim().split(" ");
            expect(columns).to.have.length(3);
            columns.forEach((col) => {
              expect(col).to.equal("200px");
            });
          });
      });
    });

    context('화면 너비가 768px 이상일 때', () => {
      it("영화 리스트가 한 줄에 1개로 표시된다.", () => {
        cy.viewport(768, 900);
        cy.wait("@getPopularMoviesPage1");

        cy.get(".thumbnail-list")
          .invoke("css", "grid-template-columns")
          .then((gridValue) => {
            const columns = gridValue.trim().split(" ");
            expect(columns).to.have.length(1);
            columns.forEach((col) => {
              expect(col).to.equal("200px");
            });
          });
      });
    })
  });
});