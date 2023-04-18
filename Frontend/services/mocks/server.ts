import { handlers } from './queriesUser';
import { queriesMarkers } from './queriesMarkers';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers, ...queriesMarkers);
