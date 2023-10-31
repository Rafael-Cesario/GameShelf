import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const StyledField = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;

	.field-name {
		color: ${Theme.text + "90"};
		font-size: 0.8rem;
		margin: 8px;
	}

	.field {
		padding: 1rem 2rem;
	}

	.error {
		font-size: 0.8rem;
		margin: 8px;
		color: ${Theme.error};
	}

	.password-field {
		width: 100vw;
		max-width: 400px;
		background-color: ${Theme.container};
		display: flex;
		justify-content: space-between;
		align-items: center;

		input {
			width: 100%;
		}

		.icon {
			margin: 0 20px;
			cursor: pointer;
			font-size: 1.3rem;
		}
	}
`;
