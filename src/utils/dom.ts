type Selector = string;

export const $ = <T extends HTMLElement = HTMLElement>(
  selector: Selector
): T | null => (document.getElementById(selector) as T) || null;
