import styled from 'styled-components';

export const StyledTitle = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	position: relative;

	h1 {
		padding: 0.3rem 2rem;
		border-bottom: 5px solid ${({ theme }) => theme.primary};
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;

		:hover {
			background-color: ${({ theme }) => theme.textRed};
			color: white;
		}
	}
`;
