import { typedefsUser } from './user/typedefsUser';
import { resolversUser } from './user/resolversUser';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const schema = makeExecutableSchema({
	typeDefs: [typedefsUser],
	resolvers: [resolversUser],
});
