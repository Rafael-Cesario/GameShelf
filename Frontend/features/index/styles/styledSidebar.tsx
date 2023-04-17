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
	justify-content: space-between;

	.title {
		font-size: 1.2rem;
		border-bottom: 10px solid ${({ theme }) => theme.primary};
		margin-bottom: 5rem;
	}

	.markers {
		margin-bottom: 5rem;

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
	}
`;
