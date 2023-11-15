import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const TextFieldStyled = styled.div`
	display: flex;
	flex-direction: column;
	margin: 8px 0;

	.field-title,
	.error {
		margin: 8px 20px;
	}

	.field-title {
		font-size: 0.9rem;
		color: ${Theme.text + "90"};
	}

	.input {
		background-color: ${Theme.container};
		color: ${Theme.text};
	}

	.error {
		font-size: 0.8rem;
		color: ${Theme.error};
	}
`;
