import gql from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = gql`
	type Query {
		hello: String
	}
`;

const resolvers = {
	Query: {
		hello: () => 'Hello, server is up and ready',
	},
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const server = new ApolloServer({ schema });

export const startServer = async (port?: number) => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: port ?? 4000 },
	});

	console.log(`✅ Server:\x1b[32m ${url} \x1b[0m`);
};
