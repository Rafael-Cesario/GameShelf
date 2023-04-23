import styled from 'styled-components';

export const StyledAddGame = styled.div`
	display: inline;

	.add-game-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 98vw;
		height: 100vh;
		background-color: #10101080;
		backdrop-filter: blur(2px);
		z-index: 1;

		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5rem;
	}

	.build-game {
		padding: 2rem;
		background-color: ${({ theme }) => theme.containerBackground};
		border: 5px solid ${({ theme }) => theme.containerBorder};

		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			font-size: 1.1rem;
		}
	}

	.inputs {
		display: grid;
		grid-template-columns: 20rem auto;
		column-gap: 2rem;
		margin: 2rem 0;

		.rate-container .title {
			margin-bottom: 1rem;
		}
	}

	.add-game-button {
		width: 100%;
		border-radius: 2px;
		background-color: ${({ theme }) => theme.primary};
	}

	.data {
		display: flex;
		flex-direction: column;
	}

	.error {
		width: 100%;
		color: ${({ theme }) => theme.textRed};
		font-size: 0.9rem;
		font-weight: bold;
		padding: 1rem;
	}
`;
