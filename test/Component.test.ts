import Component from "../src/component.ts";
import { expect, test, describe } from "vitest";

describe("컴포넌트 테스트", () => {
  test("영화 컴포넌트", () => {
    const movieData = {
      poster_path: "엘사.png",
      title: "겨울왕국",
      vote_average: 8.9,
    };
    const movieComponent = Component.movie(movieData);

    expect(movieComponent).contain(
      'src="https://image.tmdb.org/t/p/original/엘사.png"',
    );
    expect(movieComponent).contain("<strong>겨울왕국</strong>");
    expect(movieComponent).contain("<span>8.9</span>");
    expect(movieComponent).contain('alt="겨울왕국"');
  });
});
