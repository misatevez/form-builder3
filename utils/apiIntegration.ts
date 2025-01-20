import axios from 'axios';

export async function callExternalAPI(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

export function createAPIAction(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  return async (formData: any) => {
    try {
      const result = await callExternalAPI(url, method, formData);
      console.log('API action result:', result);
      return result;
    } catch (error) {
      console.error('API action failed:', error);
      throw error;
    }
  };
}

