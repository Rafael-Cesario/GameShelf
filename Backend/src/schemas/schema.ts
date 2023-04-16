import { typedefsUser } from './user/typedefsUser';
import { resolversUser } from './user/resolversUser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typedefsMarkers } from './markers/typedefsMarkers';
import { resolversMarkers } from './markers/resolversMarkers';
import { typedefsGames } from './games/typedefsGames';
import { resolversGames } from './games/resolversGames';

export const schema = makeExecutableSchema({
	typeDefs: [typedefsUser, typedefsMarkers, typedefsGames],
	resolvers: [resolversUser, resolversMarkers, resolversGames],
});
