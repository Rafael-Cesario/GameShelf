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

		button:focus {
			background-color: ${({ theme }) => theme.mainText};
			color: ${({ theme }) => theme.mainBackground};
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

	.field {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		margin: 1.2rem 0;
		width: 100%;

		input {
			margin-top: 0.5rem;
		}

		label {
			width: 300px;
			font-size: 0.8rem;
			font-weight: bold;
			color: ${({ theme }) => theme.textRed};
			line-height: 1.1rem;
		}
	}
`;
