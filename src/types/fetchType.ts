export enum FetchType {
  Popular = 'popular',
  Search = 'search',
}

export type PopularFetchType = {
  page: number;
  type: FetchType.Popular;
};

export type SearchFetchType = {
  page: number;
  type: FetchType.Search;
  keyword: string;
};

export type MovieFetchInfo = PopularFetchType | SearchFetchType;
