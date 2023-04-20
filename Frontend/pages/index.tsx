import { Notification } from '@/components/notification';
import { privateRoute } from '@/components/privateRoute';
import { GamesContainer } from '@/features/index/gamesContainer';
import { Header } from '@/features/index/header';
import { Sidebar } from '@/features/index/sidebar';
import { StyledIndex } from '@/features/index/styles/styledIndex';
import { useNotification } from '@/utils/useNotification';

const Index = () => {
	const { isOpen } = useNotification();

	return (
		<StyledIndex>
			{isOpen && <Notification />}
			<Header />
			<Sidebar />
			<GamesContainer />
		</StyledIndex>
	);
};

export default privateRoute(Index);
