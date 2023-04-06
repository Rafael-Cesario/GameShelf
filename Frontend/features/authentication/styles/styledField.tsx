import styled from 'styled-components';

export const StyledField = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1.2rem 0;

	input {
		margin-top: 0.5rem;
	}

	span {
		font-size: 0.8rem;
		font-weight: bold;
		color: ${({ theme }) => theme.textRed};
	}
`;
