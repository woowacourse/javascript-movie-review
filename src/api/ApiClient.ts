class ApiClient {
  static async fetch({ url, options }: { url: string; options: RequestInit }) {
    try {
      const raw = await fetch(url, options);
      const data = await raw.json();

      return data;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}

export default ApiClient;
