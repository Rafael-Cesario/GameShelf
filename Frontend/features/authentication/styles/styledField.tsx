import styled from 'styled-components';

export const StyledField = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	margin: 1.2rem 0;
	width: 100%;

	input {
		margin-top: 0.5rem;
		padding-right: 2.5rem;
	}

	label {
		width: 300px;
		font-size: 0.8rem;
		font-weight: bold;
		color: ${({ theme }) => theme.textRed};
		line-height: 1.1rem;
	}

	.icon {
		margin: 1.2rem 0.5rem;
		position: absolute;
		right: 0;
		color: ${({ theme }) => theme.mainText};
		cursor: pointer;
	}
`;
