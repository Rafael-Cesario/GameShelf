import styled from 'styled-components';

export const StyledHeader = styled.div`
	grid-column: 2;
	margin: 1rem;
	background-color: ${({ theme }) => theme.containerBackground};
	border: 3px solid ${({ theme }) => theme.containerBorder};
`;
