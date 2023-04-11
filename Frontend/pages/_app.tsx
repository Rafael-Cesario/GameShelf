import type { AppProps } from 'next/app';
import { CustomHead } from '@/components/customHead';
import { client } from '@/services/client';
import { StyledGlobal } from '@/styles/styledGlobal';
import { theme } from '@/styles/theme';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/context/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme['dark']}>
				<ReduxProvider store={store}>
					<StyledGlobal />
					<CustomHead />
					<Component {...pageProps} />
				</ReduxProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}
