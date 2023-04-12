import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

const link = new HttpLink({
	uri: 'http://localhost:4000',
	fetch: (...args) => fetch(...args),
});

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});
