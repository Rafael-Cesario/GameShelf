"use client";
import * as styled from "styled-components";
import { Theme } from "./theme";

export const StyledGlobal = styled.createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: #111;
		color: #eee;
	}

	input,
	button {
		border: none;
		padding: 10px 20px;
		background-color: ${Theme.container};
		color: ${Theme.text};
		border-radius: ${Theme.borderRadius};
		border: 1px solid ${Theme.border};
	}

	button {
		cursor: pointer;
		font-weight: bold;
		transition: 0.1s;

		&:hover {
			transform: scale(1.05);
		}

		&:active {
			transform: scale(1);
		}
	}
`;
