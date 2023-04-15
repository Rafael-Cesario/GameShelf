import { typedefsUser } from './user/typedefsUser';
import { resolversUser } from './user/resolversUser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typedefsMarkers } from './markers/typedefsMarkers';
import { resolversMarkers } from './markers/resolversMarkers';
import { typedefsGames } from './games/typedefsGames';

export const schema = makeExecutableSchema({
	typeDefs: [typedefsUser, typedefsMarkers, typedefsGames],
	resolvers: [resolversUser, resolversMarkers],
});
