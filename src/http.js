export const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = await response.json().then((data) => data.errors);

      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    alert(e);
  }
};
