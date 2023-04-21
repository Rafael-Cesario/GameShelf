import Image from 'next/image';
import { StyledImageContainer } from './styles/styledImage';

interface ImageContainerProps {
	props: {
		imageLink: string;
	};
}

export const ImageContainer = ({ props: { imageLink } }: ImageContainerProps) => {
	if (!imageLink.match(/http/)) imageLink = '';
	return <StyledImageContainer>{imageLink && <Image fill={true} alt="game cover" src={imageLink} />}</StyledImageContainer>;
};
