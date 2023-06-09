import styled from 'styled-components';

export const StyledImageContainer = styled.div`
	grid-row: 1;
	grid-column: 2;
	width: 17rem;
	height: 22rem;
	background-color: ${({ theme }) => theme.insideContainer};
	position: relative;

	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	img {
		border: 5px solid ${({ theme }) => theme.insideContainer};
		object-fit: cover;
		width: inherit;
		height: inherit;
	}
`;
