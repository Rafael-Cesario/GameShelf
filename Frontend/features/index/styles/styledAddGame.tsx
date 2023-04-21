import styled from 'styled-components';

export const StyledAddGame = styled.div`
	display: inline;

	.build-game > .title {
		display: flex;
		justify-content: center;
		width: 100%;
		position: relative;

		h1 {
			padding: 0.3rem 2rem;
			border-bottom: 5px solid ${({ theme }) => theme.primary};
		}

		.close {
			position: absolute;
			top: 0;
			right: 0;

			:hover {
				background-color: ${({ theme }) => theme.textRed};
				color: white;
			}
		}
	}

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

		.data-input {
			margin-bottom: 2rem;
			width: 100%;
		}

		.rate-container .title {
			margin-bottom: 1rem;
		}

		.tag-container,
		.genre-container,
		.rate-container {
			border-top: 5px solid ${({ theme }) => theme.insideContainer};
			padding-top: 2rem;
			margin-bottom: 2rem;

			.filter {
				width: 100%;
				margin-bottom: 0.5rem;
			}

			.top {
				display: flex;
				align-items: center;
				margin-bottom: 1rem;

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

			.tags,
			.genres,
			.rates {
				display: flex;
				flex-flow: row wrap;

				.tag,
				.genre,
				.rate {
					text-transform: capitalize;
					flex-grow: 1;
					margin: 0.2rem;
					padding: 5px 10px;
					background-color: ${({ theme }) => theme.insideContainer};
					max-width: 7rem;

					:hover {
						background-color: ${({ theme }) => theme.mainText};
						color: ${({ theme }) => theme.mainBackground};
					}
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
		width: 17rem;
		height: 22rem;
		background-color: ${({ theme }) => theme.insideContainer};
		position: relative;

		img {
			border: 5px solid ${({ theme }) => theme.insideContainer};
			object-fit: cover;
			width: inherit;
			height: inherit;
		}
	}

	.add-game-button {
		width: 100%;
		border-radius: 2px;
		background-color: ${({ theme }) => theme.primary};
	}
`;
