import { concat, flat, map, pipe, reduce, zip } from '@fxts/core';
import type { HTMLType } from '../types';

export const isElement = (target: EventTarget | null): target is Element => target instanceof Element;
export const isHTMLElement = (target: EventTarget | null): target is HTMLElement => target instanceof HTMLElement;
export const isWindow = (target: Element | Window): target is Window => target instanceof Window;
export const isHTMLFormElement = (target: EventTarget | null): target is HTMLFormElement =>
  target instanceof HTMLFormElement;

export const $ = (selector: string) => document.querySelector(selector) as HTMLElement;

export function html(strings: TemplateStringsArray, ...values: any[]) {
  return pipe(
    zip(
      strings,
      concat(
        map((str) => (Array.isArray(str) ? str.join('') : str), values),
        [''],
      ),
    ),
    flat,
    reduce((a, b) => a + b),
  ) as HTMLType;
}
