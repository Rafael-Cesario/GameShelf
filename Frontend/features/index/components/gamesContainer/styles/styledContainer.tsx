import styled from 'styled-components';

export const StyledContainer = styled.div`
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

	.container {
		display: flex;
		justify-content: space-between;
		position: relative;
		background-color: ${({ theme }) => theme.containerBackground};
		border: 5px solid ${({ theme }) => theme.containerBorder};
		border-radius: 2px;
		padding: 5rem 2rem;
		max-width: 70rem;
	}

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
`;
