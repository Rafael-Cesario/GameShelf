import styled from 'styled-components';

export const StyledEditGame = styled.div`
	display: grid;
	grid-template-columns: auto auto;

	.data {
		display: flex;
		flex-direction: column;
		margin-right: 4rem;
		max-width: 500px;
	}

	.title {
		font-size: 2rem;
		padding: 0;
		padding-bottom: 0.2rem;
		border-bottom: 5px solid ${({ theme }) => theme.primary};
		text-transform: capitalize;
		background-color: transparent;
	}

	.info {
		background-color: transparent;
		margin: 0.5rem 0;
		padding: 10px 20px;
		background-color: ${({ theme }) => theme.insideContainer};
		width: 100%;

		:focus,
		:hover {
		}
	}

	.rate-container,
	.filter-container {
		margin: 2rem 0;

		.title {
			font-size: 1.1rem;
			padding: 0;
			margin: 0;
			border: none;
			margin: 0.5rem;
		}
	}

	.save-button {
		margin: 2rem 0;
	}
`;
