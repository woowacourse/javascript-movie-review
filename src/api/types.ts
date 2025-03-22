export interface ApiContract {
  get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T>;
}
