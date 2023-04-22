import { handlers } from './queriesUser';
import { queriesMarkers } from './queriesMarkers';
import { setupServer } from 'msw/node';
import { mockQueriesGames } from './queriesGames';

export const server = setupServer(...handlers, ...queriesMarkers, ...mockQueriesGames);
