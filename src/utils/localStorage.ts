import type { Modal } from "../types/type";

export const getSavedData = (key: string) =>
  JSON.parse(<string>localStorage.getItem(key)) || [];

export const saveData = (key: string, data: Modal) =>
  localStorage.setItem(key, JSON.stringify(data));
