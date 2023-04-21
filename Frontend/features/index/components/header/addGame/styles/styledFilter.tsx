import styled from 'styled-components';

export const StyledFilter = styled.div`
	.filter-input {
		width: 100%;
		margin-bottom: 0.5rem;
	}

	.filter {
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
`;
