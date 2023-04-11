import styled from 'styled-components';

export const StyledNotification = styled.div<{ type: string }>`
	position: absolute;
	top: 0;
	right: 0;
	padding: 1rem;
	margin: 1rem;
	background-color: ${({ theme }) => theme.containerBackground};
	border: 2px solid ${({ theme }) => theme.containerBorder};
	border-radius: ${({ theme }) => theme.borderRadius};
	box-shadow: ${({ theme }) => theme.boxShadow};
	min-width: 300px;
	max-width: 500px;
	animation: show 0.2s both;

	@keyframes show {
		from {
			transform: translateY(-4rem);
		}

		to {
			transform: translateY(0);
		}
	}

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
	}
`;
