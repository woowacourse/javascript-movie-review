describe("인기영화 렌더링 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular*",
      { fixture: "movies.json" },
    ).as("getMovies");
    cy.intercept("GET", "**/movie/popular*page=2*",
      { fixture: "movies2.json"}
    ).as("getMoviesPage2");
    cy.intercept("GET", "**/movie/1*", { fixture: "movieDetail.json" }).as("getDetail");
    cy.visit("localhost:5173");
  });

  it("웹에 접근을 하면 인기 영화 20개를 랜더링 한다", () => {
    cy.wait("@getMovies");
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("스크롤을 끝까지 내렸을때 추가로 랜더링 한다", () => {
    cy.wait("@getMovies");
    cy.scrollTo('bottom');
    cy.wait('@getMoviesPage2');
    cy.get(".thumbnail-list li").should("have.length", 40);
  });

  it("영화 클릭시 모달창 열림", () =>{
    cy.wait("@getMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('.modal-background').should('have.class', 'active');
  });

  it("ESC를 누를시 모달창 닫힘",() =>{
    cy.wait("@getMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('.modal-background').should('have.class', 'active');
    cy.get('body').type('{esc}');
    cy.get('.modal-background').should('not.have.class', 'active');
  });

  it("닫기 버튼 클릭시 모달창 닫힘", () => {
    cy.wait("@getMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('.modal-background').should('have.class', 'active');
    cy.get('#closeModal').click();
    cy.get('.modal-background').should('not.have.class', 'active');
  });

  it("별점 클릭시 랜더링 하기", () =>{
    cy.wait("@getMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('#rate-stars img').last().click();
    cy.get('#rate-evaluate').should('have.text', '명작이에요');
    cy.get('#rate-score').should('have.text', '(10/10)');
  });

  it("별점이 모달을 닫고 다시 열어도 유지된다", () => {
    cy.wait("@getMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('#rate-stars img').last().click();
    cy.get('#closeModal').click();
    cy.get('.thumbnail-list li').first().click();
    cy.get('#rate-evaluate').should('have.text', '명작이에요');
    cy.get('#rate-score').should('have.text', '(10/10)');
  });
});

describe("검색영화 렌더링 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search/movie*", { fixture: "movies.json" }).as("searchMovies");
    cy.intercept("GET", "**/movie/popular*", { fixture: "movies.json" }).as("getMovies");
    cy.intercept("GET", "**/movie/1*", { fixture: "movieDetail.json" }).as("getDetail");
    cy.visit("localhost:5173");
  });

  it("Harry Potter를 검색 하면 검색에 따른 영화를 랜더링 한다.", () => {
    cy.wait("@getMovies");
    cy.get(".search-input").type("Harry Potter");
    cy.get(".search-button").click();
    cy.wait("@searchMovies");
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("뷁뷁뷁을 검색 하면 검색 결과가 없어야 한다.", () => {
    cy.intercept("GET", "**/search/movie*", { body: { results: [], total_pages: 1 } }).as("searchEmpty");
    cy.wait("@getMovies");
    cy.get(".search-input").type("뷁뷁뷁");
    cy.get(".search-input").type("{enter}");
    cy.wait("@searchEmpty");
    cy.get(".thumbnail-list li").should("have.length", 0);
    cy.get("#no-result").contains("검색 결과가 없습니다.").should("exist");
  });

  it("영화 클릭시 모달창 열림", () => {
    cy.wait("@getMovies");
    cy.get(".search-input").type("Harry Potter");
    cy.get(".search-button").click();
    cy.wait("@searchMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('.modal-background').should('have.class', 'active');
  });

  it("닫기 버튼 클릭시 모달창 닫힘", () => {
    cy.wait("@getMovies");
    cy.get(".search-input").type("Harry Potter");
    cy.get(".search-button").click();
    cy.wait("@searchMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('#closeModal').click();
    cy.get('.modal-background').should('not.have.class', 'active');
  });

  it("ESC를 누를시 모달창 닫힘", () => {
    cy.wait("@getMovies");
    cy.get(".search-input").type("Harry Potter");
    cy.get(".search-button").click();
    cy.wait("@searchMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('body').type('{esc}');
    cy.get('.modal-background').should('not.have.class', 'active');
  });

  it("별점 클릭시 랜더링 하기", () => {
    cy.wait("@getMovies");
    cy.get(".search-input").type("Harry Potter");
    cy.get(".search-button").click();
    cy.wait("@searchMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('#rate-stars img').last().click();
    cy.get('#rate-evaluate').should('have.text', '명작이에요');
    cy.get('#rate-score').should('have.text', '(10/10)');
  });

  it("별점이 모달을 닫고 다시 열어도 유지된다", () => {
    cy.wait("@getMovies");
    cy.get(".search-input").type("Harry Potter");
    cy.get(".search-button").click();
    cy.wait("@searchMovies");
    cy.get('.thumbnail-list li').first().click();
    cy.get('#rate-stars img').last().click();
    cy.get('#closeModal').click();
    cy.get('.thumbnail-list li').first().click();
    cy.get('#rate-evaluate').should('have.text', '명작이에요');
    cy.get('#rate-score').should('have.text', '(10/10)');
  });
});

describe("Skeleton UI 테스트", () => {
  it("이미지 로드 전 스켈레톤 UI가 표시된다", () => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { fixture: "movies.json" },
    ).as("getMovies");

    cy.intercept("GET", "https://image.tmdb.org/t/p/original/**", () => {
    });

    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");

    cy.get(".thumbnail-list li")
      .first()
      .within(() => {
        cy.get(".item").should("have.class", "skeleton");
        cy.get(".skeleton-poster").should("exist");
        cy.get(".skeleton-rate").should("exist");
        cy.get(".skeleton-title").should("exist");
      });
  });

  it("이미지 로드 실패 시 스켈레톤 UI가 제거되고 대체 이미지가 표시된다", () => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { fixture: "movies.json" },
    ).as("getMovies");

    cy.intercept("GET", "https://image.tmdb.org/t/p/original/**", {
      statusCode: 404,
    }).as("getImageFailed");

    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");
    cy.wait("@getImageFailed");

    cy.get(".thumbnail-list li")
      .first()
      .within(() => {
        cy.get(".thumbnail")
          .should("have.attr", "src")
          .and("include", "no_image.png");
        cy.get(".item").should("not.have.class", "skeleton");
        cy.get(".skeleton-poster").should("not.exist");
        cy.get(".skeleton-rate").should("not.exist");
        cy.get(".skeleton-title").should("not.exist");
      });
  });
});

// describe("인기 영화 더보기 버튼이 숨겨지는지 테스트", () => {
//   beforeEach(() => {
//     cy.intercept(
//       "GET",
//       "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
//       { fixture: "movies.json" },
//     ).as("getMovies");

//     cy.intercept(
//       "GET",
//       "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
//       { fixture: "movies2.json" },
//     ).as("getMoviesPage2");

//     cy.visit("http://localhost:5173");
//   });

//   TODO: 더보기 버튼 → 무한 스크롤로 변경
//   마지막 페이지 도달 시 스크롤해도 추가 요청이 발생하지 않는다
//   it("마지막 페이지 도달 시 더보기 버튼이 사라진다", () => {
//     cy.wait("@getMovies");
//     cy.get("#load-movie-button").click();
//     cy.wait("@getMoviesPage2");
//     cy.get("#load-movie-button").should("have.css", "display", "none");
//   });
// });

// describe("검색 영화 더보기 버튼이 숨겨지는지 테스트", () => {
//   beforeEach(() => {
//     cy.intercept("GET", "**/search/movie*page=1*", {
//       fixture: "movies.json",
//     }).as("getMovies");

//     cy.intercept("GET", "**/search/movie*page=2*", {
//       fixture: "movies2.json",
//     }).as("getMoviesPage2");

//     cy.visit("http://localhost:5173");
//   });

//   // TODO: 더보기 버튼 → 무한 스크롤로 변경
//   // 검색 결과 마지막 페이지 도달 시 스크롤해도 추가 요청이 발생하지 않는다
//   it("마지막 페이지 도달 시 더보기 버튼이 사라진다", () => {
//     cy.get(".search-input").type("영화");
//     cy.get(".search-input").type("{enter}");
//     cy.wait("@getMovies");
//     cy.get("#load-movie-button").click();
//     cy.wait("@getMoviesPage2");
//     cy.get("#load-movie-button").should("have.css", "display", "none");
//   });
// });

// TODO: 새로 추가할 테스트
// describe("무한 스크롤 테스트", () => {
//   it("스크롤을 끝까지 내리면 다음 페이지 영화가 추가 렌더링된다")
//   it("로딩 중 스크롤해도 중복 요청이 발생하지 않는다")
// });
//
// describe("모달 테스트", () => {
//   it("영화 클릭 시 모달이 열린다")
//   it("닫기 버튼 클릭 시 모달이 닫힌다")
//   it("별점 클릭 시 별점이 저장된다")
// });
