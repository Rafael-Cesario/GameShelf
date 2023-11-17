"use client";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const FieldStyled = styled.div`
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

	.container {
		display: flex;
		background-color: ${Theme.container};

		button {
			background-color: ${Theme.container};
			margin-left: 0.4px;
		}

		.input {
			background-color: ${Theme.container};
			color: ${Theme.text};
			width: 100%;
		}

		.icon {
			background-color: transparent;
			color: white;
		}
	}

	.error {
		font-size: 0.8rem;
		color: ${Theme.error};
	}
`;
