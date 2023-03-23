export interface FormFields {
  [k: string]: FormDataEntryValue;
}

export const isFormElement = (target: EventTarget): target is HTMLFormElement => {
  return target instanceof HTMLFormElement;
};

export const isStringFields = (target: FormDataEntryValue): target is string => {
  return typeof target === 'string';
};

export function getFormFields(form: HTMLFormElement): FormFields {
  const formaData = new FormData(form);

  return Object.fromEntries(formaData);
}
