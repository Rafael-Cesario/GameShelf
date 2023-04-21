import Image from 'next/image';
import { StyledImageContainer } from './styles/styledImage';

interface ImageContainerProps {
	props: {
		imageLink: string;
	};
}

export const ImageContainer = ({ props: { imageLink } }: ImageContainerProps) => {
	return (
		<StyledImageContainer>
			<Image fill={true} alt="game cover" src={'https://sm.ign.com/t/ign_pt/cover/d/dredge/dredge_d37y.1200.jpg'} />
		</StyledImageContainer>
	);
};
