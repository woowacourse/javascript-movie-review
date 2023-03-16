export interface Proxy {
  query: { value: FormDataEntryValue | null; isSearch: boolean };
  moreButton: { isClick: boolean; currentPage: number; isSearch: boolean };
}
