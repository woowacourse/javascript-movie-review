export const getPopularURL = (page) =>
  new RegExp(
    `^https:\\/\\/api\\.themoviedb\\.org\\/3\\/movie\\/popular\\?.*page=${page}.*`,
  );

export const getSearchURL = (page) =>
  new RegExp(
    `^https:\\/\\/api\\.themoviedb\\.org\\/3\\/search\\/movie\\?query=.*&include_adult=false&language=ko&page=${page}`,
  );
