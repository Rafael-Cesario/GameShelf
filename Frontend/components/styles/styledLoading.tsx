import styled from 'styled-components';

export const Styledloading = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #10101050;
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	span {
		font-size: 2rem;

		:after {
			content: '';
			position: absolute;
			transform: translate(-3rem, 1rem);
			width: 3rem;
			height: 1rem;
			background-color: ${({ theme }) => theme.mainBackground};
			animation: loading ease-in 1s infinite;

			@keyframes loading {
				to {
					transform: translate(1rem, 1rem);
				}
			}
		}
	}
`;
