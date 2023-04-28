import styled from 'styled-components';

export const StyledGameDetails = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 99vw;
	height: 100vh;
	background-color: #10101080;
	backdrop-filter: blur(2px);
	z-index: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5rem;

	.close {
		position: absolute;
		right: 0;
		top: 0;
		background-color: transparent;
		font-size: 1.2rem;
		margin: 1rem;
		border-radius: 0;

		:hover {
			background-color: ${({ theme }) => theme.textRed};
			color: white;
		}
	}

	.details {
		display: flex;
		justify-content: space-between;
		position: relative;
		background-color: ${({ theme }) => theme.containerBackground};
		border: 5px solid ${({ theme }) => theme.containerBorder};
		border-radius: 2px;
		padding: 5rem 2rem;
		width: 80vw;
		max-width: 70rem;

		.data {
			position: relative;
			margin-right: 4rem;
			text-transform: capitalize;
			width: 50%;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 2rem;
				padding-bottom: 0.3rem;
				border-bottom: 5px solid ${({ theme }) => theme.primary};
				margin-bottom: 0.5rem;
			}

			.sub-title {
				font-size: 1rem;
				margin: 2rem 0 0.2rem 0;
			}

			.info {
				color: ${({ theme }) => theme.fadedText};
				font-size: 0.9rem;
			}

			.buttons {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				button {
					background-color: transparent;
					width: 50%;

					:nth-child(1):hover {
						background-color: ${({ theme }) => theme.primary};
						color: ${({ theme }) => theme.mainText};
					}

					:nth-child(2):hover {
						background-color: ${({ theme }) => theme.textRed};
						color: white;
					}
				}
			}
		}
	}
`;
