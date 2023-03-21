import { expect } from "@jest/globals";

import { Movies } from "../src/domain/Movies";
import {
  movieList,
  storedMovieList,
  addedMovie,
  searchMovieList,
} from "./fixtures";

describe("도메인 테스트", () => {
  const movies = new Movies(movieList);

  test("영화 리스트 가져오기 기능 테스트", () => {
    const list = movies.getList();

    expect(list).toEqual(storedMovieList);
  });

  test("영화 리스트 추가 기능 테스트", () => {
    movies.add(addedMovie);

    const list = movies.getList();

    expect(list[list.length - 1].id).toBe(505642);
  });

  test("영화 리스트 리셋 기능 테스트", () => {
    movies.reset(searchMovieList);

    const list = movies.getList();

    expect(list[list.length - 1].id).toBe(1077280);
  });
});
