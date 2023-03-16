const $ = (seletor: string) => document.querySelector(seletor);
const $$ = (seletor: string) => document.querySelectorAll(seletor);

export { $, $$ };
