import styled from 'styled-components';

export const StyledFilter = styled.div`
	.filter {
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

		.faded {
			color: ${({ theme }) => theme.fadedText};
		}
	}
`;
