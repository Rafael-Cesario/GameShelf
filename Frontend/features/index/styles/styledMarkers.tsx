import styled from 'styled-components';

export const StyledMarkers = styled.ul`
	li {
		list-style: none;
		margin: 0.5rem 0;
		margin-left: 0.6rem;
		cursor: pointer;

		::first-letter {
			text-transform: capitalize;
		}

		::before {
			content: '';
			position: absolute;
			background-color: ${({ theme }) => theme.insideContainer};
			width: 0.6rem;
			height: 0.6rem;
			transform: translate(-1rem, 0.2rem);
		}
	}

	li:hover::before {
		background-color: ${({ theme }) => theme.mainText};
	}

	.active::before {
		background-color: ${({ theme }) => theme.primary};
	}
`;
