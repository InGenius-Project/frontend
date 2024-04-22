import { http } from 'msw';
import { generateAreaTitles } from './mocks/generateAreaTitles';
import { generateArea } from './mocks/generateArea';

const baseUrl = import.meta.env.VITE_APP_SERVER_ENDPOINT;

export const handlers = [
  http.post(baseUrl + '/api/Area/Generation', () => {
    return new Response(JSON.stringify(generateAreaTitles));
  }),
  http.post(baseUrl + '/api/Area/Generation/Title', () => {
    return new Response(JSON.stringify(generateArea));
  }),
];
