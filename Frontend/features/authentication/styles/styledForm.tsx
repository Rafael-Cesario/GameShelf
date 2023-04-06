import styled from 'styled-components';

export const StyledForm = styled.div`
	width: 80vw;
	height: 80vh;
	background-color: ${({ theme }) => theme.containerBackground};
	border: 2px solid ${({ theme }) => theme.containerBorder};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.title,
	.change-form,
	form input,
	form button {
		margin: 1.2rem 0;
	}

	.title {
		font-size: 0.9rem;
	}

	form {
		display: flex;
		flex-direction: column;

		input,
		button {
			height: 40px;
			width: 300px;
		}
	}

	.change-form {
		color: ${({ theme }) => theme.fadedText};
		background-color: transparent;
		font-weight: bold;
		font-size: 0.9rem;

		:hover {
			color: ${({ theme }) => theme.mainText};
		}
	}
`;
