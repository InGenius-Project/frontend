import { baseUrl } from '@/assets/utils/urls';
import { http } from 'msw';
import { generateAreaTitles } from './mocks/generateAreaTitles';
import { generateTags } from './mocks/generateTags';

export const handlers = [
  http.post(baseUrl + '/api/Area/Generation', () => {
    return new Response(JSON.stringify(generateAreaTitles));
  }),
  // http.get(baseUrl + '/api/Tag?typeId=4', () => {
  //   return new Response(JSON.stringify(generateTags));
  // }),
  // http.post(baseUrl + '/api/Area/Generation/Title', () => {
  //   return new Response(JSON.stringify(generateArea));
  // }),
  // http.get(baseUrl + '/api/Chat/Groups/', () => {
  //   return new Response(JSON.stringify(generateChatGroups));
  // }),
  // http.get(aiChatUrl + '/chat_history', () => {
  //   return new Response(JSON.stringify([]));
  // }),
];
