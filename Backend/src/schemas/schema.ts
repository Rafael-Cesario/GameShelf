import { typedefsUser } from './user/typedefsUser';
import { resolversUser } from './user/resolversUser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typedefsMarkers } from './markers/typedefsMarkers';
import { resolversMarkers } from './markers/resolversMarkers';

export const schema = makeExecutableSchema({
	typeDefs: [typedefsUser, typedefsMarkers],
	resolvers: [resolversUser, resolversMarkers],
});
