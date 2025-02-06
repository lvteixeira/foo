import axios from 'axios';

async function get(url: string): Promise<any> {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
}

async function post(url: string, payload: any): Promise<any> {
  try {
    const res = await axios.post(url, payload);
    return res.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
}

async function put(url: string, payload: any): Promise<any> {
  try {
    const res = await axios.put(url, payload);
    return res.data;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
}

async function del(url: string): Promise<any> {
  try {
    const res = await axios.delete(url);
    return res.data;
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;
  }
}

const HttpUtil = {
  get,
  post,
  put,
  delete: del,
};

export default HttpUtil;