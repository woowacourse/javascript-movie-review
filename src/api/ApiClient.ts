class ApiClient {
  static async fetch({ url, options }: { url: string; options: RequestInit }) {
    const raw = await fetch(url, options);

    if (!raw.ok) {
      throw new Error(`HTTP error: ${raw.status}`);
    }

    const data = await raw.json();

    return data;
  }
}

export default ApiClient;
