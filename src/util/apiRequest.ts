import { handleHTTPError, handleOffLine } from "./apiErrorHandler";

export const request = async (url: string) => {
  handleOffLine();

  const response = await fetch(url);

  if (!response.ok) {
    handleHTTPError(response.status);
  }

  return response.json();
};
