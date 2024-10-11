import axios from 'axios';
import {Daum, Root} from '../model/books';

const API_URL = 'https://stephen-king-api.onrender.com/api';

// export const fetchBooksList = async (): Promise<Daum[]> => {
//   const response = await axios.get<{data: Root[]}>(`${API_URL}/books`);
//   return response.data.data;
// };

// export const fetchBooksDetail = async (id: string): Promise<Daum[]> => {
//   const response = await axios.get<{data: Root}>(`${API_URL}/book/${id}`);
//   return response.data.data;
// };

export const fetchBooksList = async (): Promise<Daum[]> => {
  try {
    const response = await axios.get<Root>(`${API_URL}/books`);
    console.log('Dados da API: ', response.data.data); // Debug: Verifica os dados recebidos
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar livros: ', error);
    throw error;
  }
};
