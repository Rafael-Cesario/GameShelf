import styled from 'styled-components';

export const StyledRateContainer = styled.div`
	.title {
		margin-bottom: 1rem;
	}

	.rates {
		display: flex;
		flex-wrap: wrap;
		flex-grow: 1;

		.rate {
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
`;
