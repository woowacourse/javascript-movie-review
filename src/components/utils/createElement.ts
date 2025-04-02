type CreateElementProps<K extends keyof HTMLElementTagNameMap> = {
  tag: K;
  classNames?: string[];
  attributes?: Partial<HTMLElementTagNameMap[K]>;
};

export default function createElement<K extends keyof HTMLElementTagNameMap>(
  props: CreateElementProps<K>
): HTMLElementTagNameMap[K] {
  const { tag, classNames = [], attributes = {} } = props;

  const $element = document.createElement(tag);

  classNames.forEach((className) => $element.classList.add(className));

  Object.entries(attributes).forEach(([key, value]) => {
    // @ts-ignore: 런타임 동적 접근 허용
    $element[key] = value;
  });

  return $element;
}
