import { StyledTitle } from './styles/styledTitle';

interface TitleProps {
	setIsOpen: (isOpen: boolean) => void;
}

export const Title = ({ setIsOpen }: TitleProps) => {
	return (
		<StyledTitle>
			<h1>Adicionar novo jogo</h1>
			<button className="close" onClick={() => setIsOpen(false)}>
				x
			</button>
		</StyledTitle>
	);
};
