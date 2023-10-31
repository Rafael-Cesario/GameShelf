import { Theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledForm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

	.title {
		margin: 2rem 0;
	}

	.submit {
		margin-top: 2rem;
		width: 100%;
		background-color: ${Theme.primary};
	}

	.change-form {
		background-color: transparent;
		border: none;
		color: ${Theme.text + "90"};
		margin: 8px 0;
	}
`;
