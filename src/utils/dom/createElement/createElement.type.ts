export interface CreateElementParams {
  tagName: keyof HTMLElementTagNameMap;
  text?: string;
  attributeOptions?: Record<string, string>;
}
