type LoadingData = {
  status: "loading";
};

type SuccesData<T> = {
  status: "success";
  data: T;
};

export type APIData<T> = LoadingData | SuccesData<T>;
