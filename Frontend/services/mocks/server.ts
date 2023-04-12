import { handlers } from './queriesUser';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
