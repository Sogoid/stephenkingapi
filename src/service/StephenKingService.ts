import axios from 'axios';
import {Data as Books} from '../model/books';

const API_URL = 'https://stephen-king-api.onrender.com/api';

export const fetchBooksList = async (
  offset = 0,
  limit = 100,
): Promise<Books[]> => {
  const response = await axios.get<{data: Books[]}>(
    `${API_URL}/books?offset=${offset}&limit=${limit}`,
  );
  return response.data.data;
};

export const fetchBooksDetail = async (id: string): Promise<Books> => {
  const response = await axios.get<{data: Books}>(`${API_URL}/book/${id}`);
  return response.data.data;
};

export const fetchBooksDetailByName = async (name: string): Promise<Books> => {
  const response = await axios.get<{data: Books}>(`${API_URL}/book/${name}`);
  return response.data.data;
};
