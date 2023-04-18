import styled from 'styled-components';

export const StyledSidebar = styled.div`
	grid-row: 1 / span 2;
	margin: 1rem;
	min-height: 100vh;
	background-color: ${({ theme }) => theme.containerBackground};
	border: 2px solid ${({ theme }) => theme.containerBorder};
	padding: 2rem;

	display: flex;
	flex-direction: column;

	.title {
		font-size: 1.2rem;
		border-bottom: 10px solid ${({ theme }) => theme.primary};
		margin-bottom: 5rem;
	}

	.new-marker {
		margin: 1rem 0;
		background-color: transparent;
		padding-left: 0;
		color: ${({ theme }) => theme.fadedText};

		:hover {
			background-color: ${({ theme }) => theme.mainText};
			color: ${({ theme }) => theme.mainBackground};
		}
	}
`;
