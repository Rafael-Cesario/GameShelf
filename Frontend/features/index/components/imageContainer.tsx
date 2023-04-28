import Image from 'next/image';
import { StyledImageContainer } from '../styles/styledImageContainer';

interface ImageContainerProps {
	props: {
		gameName: string;
		imageLink: string;
	};
}

export const ImageContainer = ({ props: { imageLink, gameName } }: ImageContainerProps) => {
	if (!imageLink?.match(/http/)) imageLink = '';
	return (
		<StyledImageContainer>
			{!imageLink && <h1>{gameName}</h1>}
			{imageLink && <Image fill={true} alt="game cover" src={imageLink} />}
		</StyledImageContainer>
	);
};
