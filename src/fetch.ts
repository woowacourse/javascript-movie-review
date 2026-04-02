/**
 * isPending
 *
 */

export const getData = async <T>(url: string): Promise<T> => {
  return await fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const useQuery = async () => {
  let isPending;
  let isSuccess;

  const data = await getData();
};
