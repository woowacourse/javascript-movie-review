import Store from "./Store";

const store: Store = Store.getInstance();

export const fetchMovies = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (store.getPage() === data.page) {
      return data;
    }
    else {
      console.log(response);
      console.log(data);
      throw new Error(data.status_message);
    }

  } catch (error) {
    if (error instanceof Error) return console.log(error.message);
  }
};
