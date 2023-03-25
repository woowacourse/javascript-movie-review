export function addData(data: unknown, id: string = 'my_votes') {
  localStorage.setItem(id, JSON.stringify(data));
}

export function getData(id: string = 'my_votes', defaultData?: unknown) {
  const data = localStorage.getItem(id);

  if (!data) return defaultData;

  return JSON.parse(data);
}
