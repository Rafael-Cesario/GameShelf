import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schemas/schema';

const server = new ApolloServer({
	schema,
	formatError: (formatedError) => ({
		message: formatedError.message,
	}),
});

export const startServer = async (port?: number) => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: port ?? 4000 },
	});

	console.log(`✅ Server:\x1b[32m ${url} \x1b[0m`);

	return url;
};
