import { Styledloading } from './styles/styledLoading';

export const Loading = () => {
	return (
		<Styledloading role="loading-page">
			<span className="dot01">.</span>
			<span className="dot02">.</span>
			<span className="dot03">.</span>
		</Styledloading>
	);
};
