import { http, delay, HttpResponse } from 'msw';
import { ApiUrls } from '../services/types';

const handlers = [
  http.get(`${ApiUrls.DefaultUrl}`, async () => {
    await delay(150);
    return HttpResponse.json({ message: 'Mocked data' });
  }),
];

export default handlers;
