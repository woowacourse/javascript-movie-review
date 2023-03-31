import { APIError, OfflineError, ResponseError } from "../errors";

const fetchApi = async (url) => {
  if (!navigator.onLine) throw new OfflineError();
  try {
    const response = await fetch(url);
    const json = response.json();
    if (json.status_code) {
      throw new APIError(json.status_code);
    }
    return json;
  } catch (error) {
    if (error.name === "API Error") {
      throw new error();
    }
    throw new ResponseError();
  }
};

export default fetchApi;
