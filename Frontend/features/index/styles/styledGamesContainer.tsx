import styled from 'styled-components';

export const StyledGamesContainer = styled.div`
	margin: 1rem;
	background-color: ${({ theme }) => theme.containerBackground};
	padding: 2rem;
	height: max-content;

	display: grid;
	grid-template-columns: repeat(auto-fit, 10rem);
	justify-content: center;
	column-gap: 2rem;
	row-gap: 2rem;

	.game {
		background-color: ${({ theme }) => theme.insideContainer};
		width: 10rem;
		height: 14rem;
	}
`;
