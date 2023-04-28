import styled from 'styled-components';

export const StyledGamesContainer = styled.div`
	margin: 1rem;
	background-color: ${({ theme }) => theme.containerBackground};
	padding: 2rem;
	height: max-content;

	display: flex;
	flex-flow: row wrap;

	.game {
		background-color: ${({ theme }) => theme.insideContainer};
		width: 10rem;
		height: 14rem;
		cursor: pointer;
		transition: 0.2s;
		position: relative;
		margin: 0.5rem;

		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.game-name {
			font-size: 1rem;
			text-transform: capitalize;
		}

		:hover {
			transform: scale(1.05);
		}

		.img {
			width: inherit;
			height: inherit;
			object-fit: cover;
			border: 5px solid ${({ theme }) => theme.insideContainer};
			position: absolute;
		}
	}
`;
