import { UnPack } from '../../types/common';

export type FormFields<Keys extends string> = Record<Keys, string>;

export const isFormElement = (target: EventTarget): target is HTMLFormElement => {
  return target instanceof HTMLFormElement;
};

export const isStringFields = (target: FormDataEntryValue): target is string => {
  return typeof target === 'string';
};

export function getFormFields<Keys extends readonly string[]>(
  form: HTMLFormElement,
  keys: Keys
): FormFields<UnPack<Keys>> {
  const formData = new FormData(form);
  const fields = Object.fromEntries(formData);

  if (Object.keys(fields).every((key) => keys.includes(key))) {
    return Array.from(formData.entries()).reduce((formFields, [key, value]) => {
      if (isStringFields(value)) return Object.assign(formFields, { [key]: value });

      throw new Error('Not string value');
    }, {}) as FormFields<UnPack<Keys>>;
  }

  throw new Error("Don't have key in fields");
}
