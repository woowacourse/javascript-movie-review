export default function BodyController() {
  const $body = document.body;

  return {
    addClass: (name: string) => $body.classList.add(name),
    removeClass: (name: string) => $body.classList.remove(name),
  };
}
