import Store from "./Store";

const store: Store = Store.getInstance();

export const fetchMovies = async (url: string) => {
  try {
    const response = await fetch(url).then((data) => data.json());
    if (store.getPage() === response.page) {
      return response;
    }
    else {
      throw new Error(response.status_message);
    }

  } catch (error) {
    if (error instanceof Error) return alert(error.message);
  }
};


