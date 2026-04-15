export const getElement = <T extends typeof HTMLElement>(
  selector: string,
  type: T,
) => {
  const element = document.querySelector(selector);
  if (element instanceof type) return element as InstanceType<T>;
  else throw new Error(`element is not instance of ${type.name}`);
};
