import { concat, flat, map, pipe, reduce, zip } from '@fxts/core';
import type { HTMLType } from './types';

export const isElement = (target: EventTarget | null): target is Element => target instanceof Element;
export const isHTMLElement = (target: EventTarget | null): target is HTMLElement => target instanceof HTMLElement;

export const isWindow = (target: Element | Window): target is Window => target instanceof Window;

export const isHTMLFormElement = (target: EventTarget | null): target is HTMLFormElement =>
  target instanceof HTMLFormElement;

export const isError = (error: Error | unknown): error is Error => error instanceof Error;

export const isString = (str: string | unknown): str is string => typeof str === 'string';

export const $ = (selector: string) => document.querySelector(selector) as HTMLElement;

const escape = (str: string) => (Array.isArray(str) ? str.join('') : str);

export function html(strings: TemplateStringsArray, ...values: any[]) {
  return pipe(
    zip(
      strings,
      concat(
        // TODO: escape
        map((value) => escape(value), values),
        [''],
      ),
    ),
    flat,
    reduce((a, b) => a + b),
  ) as HTMLType;
}

export const variant = (object: Record<string, boolean>): string => {
  return Object.entries(object).reduce((prev, [str, condition]) => (condition ? str + prev : prev), '');
};
