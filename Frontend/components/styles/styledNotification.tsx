import styled from 'styled-components';

export const StyledNotification = styled.div<{ type: string }>`
	position: absolute;
	top: 0;
	left: 0;
	padding: 1rem;
	margin: 1rem;
	background-color: ${({ theme }) => theme.insideContainer};
	border: 2px solid ${({ theme }) => theme.containerBorder};
	border-radius: ${({ theme }) => theme.borderRadius};
	box-shadow: ${({ theme }) => theme.boxShadow};
	min-width: 400px;
	max-width: 800px;
	/* animation: show 0.2s;

	@keyframes show {
		from {
			transform: translateY(-4rem);
		}

		to {
			transform: translateY(0);
		}
	} */

	.close {
		position: absolute;
		background-color: transparent;
		top: 0;
		right: 0;

		:hover {
			background-color: ${({ theme }) => theme.textRed};
			color: ${({ theme }) => theme.mainText};
		}
	}

	.title {
		font-size: 1.1rem;
		color: ${({ theme, type }) => (type === 'Erro' ? theme.textRed : theme.textGreen)};
		margin-bottom: 0.5rem;
	}
`;
