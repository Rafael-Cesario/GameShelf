import styled from 'styled-components';

export const StyledHeader = styled.div`
	grid-column: 2;
	margin: 1rem;
	background-color: ${({ theme }) => theme.containerBackground};
	border: 2px solid ${({ theme }) => theme.containerBorder};
	padding: 1rem;

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;

	.games-on-marker {
		color: ${({ theme }) => theme.textBlue};
		font-weight: bold;
		margin: 0 0.5rem;
	}

	button {
		background-color: transparent;
		margin: 0 0.5rem;
	}

	.search {
		margin: 0 1rem;
		width: 30%;
		padding: 0.6rem 1rem;
	}

	@media (max-width: 1200px) {
		flex-direction: column;

		.search {
			margin-top: 1rem;
			width: 90%;
		}
	}
`;
