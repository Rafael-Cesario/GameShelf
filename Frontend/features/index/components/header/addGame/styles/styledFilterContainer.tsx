import styled from 'styled-components';

export const StyledFilterContainer = styled.div`
	border-top: 5px solid ${({ theme }) => theme.insideContainer};
	padding-top: 2rem;
	margin-bottom: 2rem;

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
`;
