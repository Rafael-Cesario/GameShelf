import styled from 'styled-components';

export const StyledSidebar = styled.div`
	grid-row: 1 / span 2;
	margin: 1rem;
	height: 95vh;
	background-color: ${({ theme }) => theme.containerBackground};
	border: 2px solid ${({ theme }) => theme.containerBorder};
	padding: 1rem 2rem;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.title {
		font-size: 1.2rem;
		border-bottom: 5px solid ${({ theme }) => theme.primary};
	}

	.marker-search,
	.title {
		margin-bottom: 3rem;
	}
`;
