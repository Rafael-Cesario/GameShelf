import { privateRoute } from '@/components/privateRoute';
import { GamesContainer } from '@/features/index/gamesContainer';
import { Header } from '@/features/index/header';
import { Sidebar } from '@/features/index/sidebar';
import { StyledIndex } from '@/features/index/styles/styledIndex';

const Index = () => {
	return (
		<StyledIndex>
			<Header />
			<Sidebar />
			<GamesContainer />
		</StyledIndex>
	);
};

export default privateRoute(Index);
