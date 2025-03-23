import { concat, flat, pipe, reduce, zip } from '@fxts/core';
import type { HTMLType } from './types';

export const isElement = (target: EventTarget | null): target is Element => {
  return target instanceof Element;
};

export const isHTMLFormElement = (target: EventTarget | null): target is HTMLFormElement => {
  return target instanceof HTMLFormElement;
};
export const isError = (error: Error | unknown): error is Error => error instanceof Error;

export const isString = (str: string | unknown): str is string => typeof str === 'string';

export const $ = (selector: string) => {
  return document.querySelector(selector) as HTMLElement;
};

// const escape = (str: string) =>
//   String(str)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#39;');

export function html(strings: TemplateStringsArray, ...values: any[]) {
  return pipe(
    zip(
      strings,
      concat(
        // TODO: escape
        // map((value) => escape(value), values),
        values,
        [''],
      ),
    ),
    flat,
    reduce((a, b) => a + b),
  ) as HTMLType;
}
