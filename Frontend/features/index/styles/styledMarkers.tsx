import styled from 'styled-components';

export const StyledMarkers = styled.ul`
	li {
		list-style: none;
		margin: 0.5rem 0;
		cursor: pointer;
		font-weight: bold;
		padding: 5px 10px;
		color: ${({ theme }) => theme.fadedText};

		::first-letter {
			text-transform: capitalize;
		}
	}

	.active,
	li:hover {
		color: ${({ theme }) => theme.mainText};
		background-color: ${({ theme }) => theme.primary};
		border-radius: 2px;
	}
`;
