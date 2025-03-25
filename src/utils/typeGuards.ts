import { ApiResponse, ErrorResponse } from "../../types";

export const isElement = (target: EventTarget | null): target is Element => {
  return target instanceof Element;
};

export const isErrorResponse = (
  response: ApiResponse
): response is ErrorResponse => {
  return "error" in response;
};
