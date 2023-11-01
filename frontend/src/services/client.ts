import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_URI_API,
	cache: new InMemoryCache({ addTypename: false }),
});
