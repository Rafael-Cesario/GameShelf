import styled from 'styled-components';

export const StyledAddGame = styled.div`
	display: inline;

	.add-game-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
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

		.data-input {
			margin-bottom: 2rem;
			width: 100%;
		}

		.tag-container {
			.filter {
				width: 100%;
				margin-bottom: 0.5rem;
			}

			.top {
				display: flex;
				align-items: center;

				input {
					width: 100%;
					margin: 0 0.5rem;
				}

				button {
					margin: 0.5rem;
					padding: 5px 10px;
					background-color: ${({ theme }) => theme.primary};
				}
			}

			.tags {
				display: flex;
				flex-flow: row wrap;

				.tag {
					flex-grow: 1;
					margin: 0.2rem;
					padding: 5px 10px;
					background-color: ${({ theme }) => theme.insideContainer};
					max-width: 7rem;
				}

				.active {
					background-color: ${({ theme }) => theme.primary};
				}
			}
		}
	}

	.image {
		grid-row: 1;
		grid-column: 2;
		width: 300px;
		height: 400px;
		background-color: ${({ theme }) => theme.insideContainer};
	}
`;
