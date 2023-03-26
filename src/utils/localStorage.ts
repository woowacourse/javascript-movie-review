export function getData(key = 'rate', defaultData = '[]') {
  return JSON.parse(localStorage.getItem(key) || defaultData);
}

export function updateData(key = 'rate', data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}
