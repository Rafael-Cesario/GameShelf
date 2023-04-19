import styled from 'styled-components';

export const StyledBuildMarker = styled.div`
	.open-button {
		margin: 0.5rem 0;
		background-color: transparent;
		padding-left: 0;
		color: ${({ theme }) => theme.fadedText};

		:hover {
			color: ${({ theme }) => theme.mainText};
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

	.config-marker {
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
		.filter {
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
	}

	.error {
		font-size: 0.8rem;
		color: ${({ theme }) => theme.textRed};
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.buttons {
		button {
			width: 100%;
			margin: 0.5rem 0;
		}
	}

	.delete:hover {
		background-color: ${({ theme }) => theme.textRed};
		color: ${({ theme }) => theme.mainText};
	}
`;
