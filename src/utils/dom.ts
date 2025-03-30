import { concat, flat, map, pipe, reduce, zip } from '@fxts/core';
import type { HTMLType } from '../types';
import { errorMessage } from '@/modules';
import { Component } from '@/components/core';

export const isElement = (target: EventTarget | null): target is Element => target instanceof Element;
export const isHTMLElement = (target: EventTarget | null): target is HTMLElement => target instanceof HTMLElement;
export const isWindow = (target: Element | Window): target is Window => target instanceof Window;
export const isHTMLFormElement = (target: EventTarget | null): target is HTMLFormElement =>
  target instanceof HTMLFormElement;

export const $ = <TElement extends Element = HTMLElement, USelector extends string = string>(
  selector: USelector,
  context: Document | HTMLElement = document,
): USelector extends `${string}?` ? TElement | null : TElement => {
  const target = context.querySelector<TElement>(selector.endsWith('?') ? selector.slice(0, -1) : selector);

  if (!target && !selector.endsWith('?')) throw new Error(errorMessage.get('dom-not-found', String(context), selector));

  return target!;
};

export const escape = (value: unknown) => {
  if (Array.isArray(value) && value.every((it) => it instanceof Component)) {
    return value.map((it) => it.template()).join('');
  }
  return value;
};

export function html(strings: TemplateStringsArray, ...values: unknown[]): HTMLType {
  return pipe(
    zip(
      strings,
      concat(
        map((str) => (Array.isArray(str) ? reduce((a, b) => `${a}${b}`, str) : str), map(escape, values)),
        [''],
      ),
    ),
    flat,
    reduce((a, b) => a + b),
  );
}
