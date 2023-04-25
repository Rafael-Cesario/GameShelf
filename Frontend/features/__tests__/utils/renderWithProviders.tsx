import { sliceNotification } from '@/context/sliceNotification';
import { Store } from '@/context/store';
import { sliceGames } from '@/features/index/slices/games';
import { sliceMarker } from '@/features/index/slices/marker';
import { client } from '@/services/client';
import { ApolloProvider } from '@apollo/client';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

export const renderWithProviders = (component: React.ReactElement, preloadedState?: PreloadedState<Store>) => {
	const store = configureStore({
		preloadedState,
		reducer: {
			notification: sliceNotification.reducer,
			marker: sliceMarker.reducer,
			games: sliceGames.reducer,
		},
	});

	const Wrapper = ({ children }: PropsWithChildren<object>) => {
		return (
			<ApolloProvider client={client}>
				<ReduxProvider store={store}>{children}</ReduxProvider>
			</ApolloProvider>
		);
	};

	return render(component, { wrapper: Wrapper });
};
