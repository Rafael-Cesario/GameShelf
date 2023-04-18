import styled from 'styled-components';

export const StyledCreateMarker = styled.div`
	.new-marker {
		margin: 1rem 0;
		background-color: transparent;
		padding-left: 0;
		color: ${({ theme }) => theme.fadedText};

		:hover {
			background-color: ${({ theme }) => theme.mainText};
			color: ${({ theme }) => theme.mainBackground};
		}
	}

	.container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100vh;
		background-color: ${({ theme }) => theme.containerBackground + '50'};
		backdrop-filter: blur(2px);
		padding: 5rem;

		display: flex;
		flex-flow: column wrap;
		align-items: center;
	}

	.build-marker {
		border-radius: ${({ theme }) => theme.borderRadius};
		border: 2px solid ${({ theme }) => theme.primary};
		background-color: ${({ theme }) => theme.containerBackground};
		padding: 5rem;

		display: flex;
		flex-flow: column wrap;
		width: 50vw;
		max-width: 500px;

		h1 {
			font-size: 1.1rem;
		}

		h2 {
			font-size: 1rem;
		}

		.title,
		.name,
		.tags,
		.genre,
		.rate {
			margin-bottom: 2rem;
		}

		.title {
			border: none;
			display: flex;
			justify-content: space-between;

			.close {
				background-color: transparent;

				:hover {
					background-color: ${({ theme }) => theme.textRed};
					color: ${({ theme }) => theme.mainText};
				}
			}
		}

		.tags,
		.genre,
		.rate {
			margin-top: 1rem;
			display: flex;
			flex-flow: row wrap;

			button {
				flex-grow: 1;
				margin: 0.2rem;
				background-color: ${({ theme }) => theme.insideContainer};

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
`;
