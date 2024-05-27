import { baseUrl } from '@/assets/utils/urls';
import { http } from 'msw';
import { mockRecruitments } from './mocks/mockRecruitments';
import { mockGenerationArea } from './mocks/mockgenerationArea';
import { mockGenerateAreaByTitle } from './mocks/mockgenerateAreaByTitle';

export const handlers = [
  // http.get(baseUrl + '/api/Resume/6cafb84d-0a6b-41fa-b306-fb356f2af502/Relative', () => {
  //   return new Response(JSON.stringify(mockRecruitments));
  // }),
  // http.get(baseUrl + '/api/Recruitment', () => {
  //   return new Response(JSON.stringify(mockRecruitments));
  // }),
  // http.get(baseUrl + '/api/Tag?typeId=4', () => {
  //   return new Response(JSON.stringify(generateTags));
  // }),
  // http.post(baseUrl + '/api/Area/Generation/Title', () => {
  //   return new Response(JSON.stringify(generateArea));
  // }),
  // http.post(baseUrl + '/api/Area/Generation', () => {
  //   return new Response(JSON.stringify(mockGenerationArea));
  // }),
  // http.post(baseUrl + '/api/Area/Generation/Title', () => {
  //   return new Response(JSON.stringify(mockGenerateAreaByTitle));
  // }),
  // http.get(baseUrl + '/api/Chat/Groups/', () => {
  //   return new Response(JSON.stringify(generateChatGroups));
  // }),
  // http.get(aiChatUrl + '/chat_history', () => {
  //   return new Response(JSON.stringify([]));
  // }),
];
