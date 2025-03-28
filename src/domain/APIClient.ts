import { STATUS_CODE_MESSAGE } from '../constants/errorMessage';
import { SYSTEM_CONSTANTS } from '../constants/systemConstants';

class APIClient {
  static async get(url: string) {
    try {
      const response = await fetch(SYSTEM_CONSTANTS.BASE_API_URL + url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const message = STATUS_CODE_MESSAGE[response.status] || `${response.status} 에러가 발생했습니다.`;
        throw new Error(message);
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default APIClient;
