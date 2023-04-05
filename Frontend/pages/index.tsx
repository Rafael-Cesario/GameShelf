import { privateRoute } from '@/components/privateRoute';

const Index = () => {
	return <h1>Index</h1>;
};

export default privateRoute(Index);
