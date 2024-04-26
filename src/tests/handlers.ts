import { http } from 'msw';
import { generateAreaTitles } from './mocks/generateAreaTitles';
import { generateArea } from './mocks/generateArea';
import { aiChatUrl, baseUrl } from '@/assets/utils/urls';
import { generateChatGroups } from './mocks/generateChatGroups';

export const handlers = [
  http.post(baseUrl + '/api/Area/Generation', () => {
    return new Response(JSON.stringify(generateAreaTitles));
  }),
  http.post(baseUrl + '/api/Area/Generation/Title', () => {
    return new Response(JSON.stringify(generateArea));
  }),
  // http.get(baseUrl + '/api/Chat/Groups/', () => {
  //   return new Response(JSON.stringify(generateChatGroups));
  // }),
  http.get(aiChatUrl + '/chat_history', () => {
    return new Response(JSON.stringify([]));
  }),
];
