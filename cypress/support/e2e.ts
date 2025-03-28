// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on("window:before:load", (win) => {
  class MockIntersectionObserver {
    constructor(callback: any, options?: any) {
      setTimeout(() => {
        callback([
          {
            isIntersecting: true,
            target: {},
            intersectionRatio: 1,
            time: 0,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: {} as DOMRectReadOnly,
          },
        ]);
      }, 100);
    }

    observe() {}
    unobserve() {}
    disconnect() {}

    readonly root: null = null;
    readonly rootMargin: string = "0px";
    readonly thresholds: ReadonlyArray<number> = [0];
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  (win as any).IntersectionObserver = MockIntersectionObserver;
});
