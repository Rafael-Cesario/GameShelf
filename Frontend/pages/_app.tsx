import { CustomHead } from '@/components/customHead';
import { client } from '@/services/client';
import { StyledGlobal } from '@/styles/styledGlobal';
import { theme } from '@/styles/theme';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme['dark']}>
				<StyledGlobal />
				<CustomHead />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
}
