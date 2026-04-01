import { describe, it, expect, vi, afterEach } from "vitest";
import { fetcher } from "../src/utils/fetcher";

interface SuccessResponse {
  code: string;
  result: any;
}

interface ErrorResponse {
  code: string;
  message: string;
}

afterEach(() => {
  vi.restoreAllMocks();
});

const mockFetch = (ok = true) => {
  let body: SuccessResponse | ErrorResponse;

  if (ok) {
    body = { code: "NICE-200", result: {} };
  } else {
    body = { code: "TMDB-400", message: "꽝입니다" };
  }

  vi.spyOn(global, "fetch").mockResolvedValue({
    ok,
    json: () => Promise.resolve(body),
  } as Response);
};

const mockFetchNetworkError = (message = "Network Error") => {
  vi.spyOn(global, "fetch").mockRejectedValue(new TypeError(message));
};

describe("fetcher", () => {
  it("200-299 사이 응답이 오면 응답 타입을 반환한다.", async () => {
    mockFetch(true);

    const response = await fetcher<SuccessResponse, ErrorResponse>(
      "/어쩌구저쩌구",
      {},
    );

    expect(response).toHaveProperty("result");
  });

  it("400-599 사이 응답이 오면 에러 타입을 반환한다.", async () => {
    mockFetch(false);

    const response = await fetcher<SuccessResponse, ErrorResponse>(
      "/어쩌구",
      {},
    );

    expect(response).toHaveProperty("message");
  });

  it("서버 응답이 없으면 예외를 반환한다.", async () => {
    mockFetchNetworkError("fetch 실패");

    await expect(
      fetcher<SuccessResponse, ErrorResponse>("/", {}),
    ).rejects.toThrow();
  });

  it("기본 Header에 application/json과 전달한 endpoint가 전달된다.", async () => {
    mockFetch(true);
    await fetcher("/어쩌구저쩌구", {});

    expect(global.fetch).toHaveBeenCalledWith(
      "/어쩌구저쩌구",
      expect.objectContaining({
        headers: expect.objectContaining({
          accept: "application/json",
        }),
      }),
    );
  });

  it("외부에서 전달한 headers가 병합된다", async () => {
    mockFetch(true);

    await fetcher<SuccessResponse, ErrorResponse>("/어쩌구저쩌구", {
      headers: { Authorization: "Bearer token" },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/어쩌구저쩌구",
      expect.objectContaining({
        headers: expect.objectContaining({
          accept: "application/json",
          Authorization: "Bearer token",
        }),
      }),
    );
  });
});
