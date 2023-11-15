import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const AuthenticationStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

	.title,
	.button-container {
		margin: 2rem 0;
	}

	.form,
	.button-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.set-form {
		background-color: transparent;
		color: ${Theme.text + "50"};
		margin: 8px 0;

		&:hover {
			color: ${Theme.text};
		}
	}

	.submit {
		background-color: ${Theme.primary};
		color: ${Theme.text};
	}
`;
