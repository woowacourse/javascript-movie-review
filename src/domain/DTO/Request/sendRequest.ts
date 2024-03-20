const fetchData = (url: string, options: object) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export default fetchData;
