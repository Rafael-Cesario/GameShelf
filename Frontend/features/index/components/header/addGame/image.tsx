import Image from 'next/image';
import { StyledImageContainer } from './styles/styledImage';

export const ImageContainer = () => {
	return (
		<StyledImageContainer>
			<Image fill={true} alt="game cover" src={'https://sm.ign.com/t/ign_pt/cover/d/dredge/dredge_d37y.1200.jpg'} />
		</StyledImageContainer>
	);
};
