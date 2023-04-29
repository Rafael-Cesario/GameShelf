import styled from 'styled-components';

export const StyledFilter = styled.div`
	.title {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}

	.search-filter {
		margin-bottom: 1rem;
		width: 100%;
	}

	.filter-container {
		display: flex;
		flex-flow: row wrap;
		margin-bottom: 4rem;

		.filter {
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
			color: ${({ theme }) => theme.mainText};
			font-weight: bold;
		}
	}
`;
