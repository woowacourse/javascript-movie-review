export interface FormDataInterface {
  [k: string]: FormDataEntryValue;
}

export function getFormFields(form: HTMLFormElement) {
  const formaData = new FormData(form);

  return Object.fromEntries(formaData);
}
