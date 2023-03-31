// export function toggle(elem: HTMLElement, message: string) {
//   elem.classList.toggle(message);
// }

export const toggle = {
  on(elem: HTMLElement, message: string) {
    elem.classList.toggle(message);
  },
  off(elem: HTMLElement, message: string) {
    elem.classList.toggle(message);
  },
};
