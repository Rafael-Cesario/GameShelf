import styled from 'styled-components';

export const Styledloading = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #10101050;
	backdrop-filter: blur(4px);
	display: flex;
	justify-content: center;
	align-items: center;

	span {
		font-weight: bold;
		font-size: 2rem;
		opacity: 0;
	}

	.dot01 {
		animation: show01 1s infinite;

		@keyframes show01 {
			90% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}
	}

	.dot02 {
		animation: show02 1s 0.1s infinite;

		@keyframes show02 {
			90% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}
	}
	.dot03 {
		animation: show03 1s 0.2s infinite;

		@keyframes show03 {
			90% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}
	}
`;
