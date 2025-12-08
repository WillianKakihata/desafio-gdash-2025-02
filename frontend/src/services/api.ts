import type { WeatherLogModelOut } from '@/types/weather'
import { getMockWeatherLogs, getMockInsights } from './mockData'
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const USE_MOCK_DATA = false

export async function initCollector(token: string) {
  await api.post('http://127.0.0.1:8081/registrar-coleta', { token })
}
export async function getWeatherLogs(): Promise<WeatherLogModelOut[]> {
  const { data } = await api.get('/weather/logs');
  return data;
}

export async function getInsights(): Promise<string> {
  const { data } = await api.post('/weather/insights', null, {
    responseType: 'text'
  });
  return data
}

export async function exportCsv(): Promise<Blob> {
  const response = await api.get('/weather/export/csv', {
    responseType: 'blob',
  });
  return response.data;
}

export async function exportXlsx(): Promise<Blob> {
  const response = await api.get('/weather/export/xlsx', {
    responseType: 'blob',
  });
  return response.data;
}
