"use client";
import * as styled from "styled-components";
import { Theme } from "./theme";

export const GlobalStyled = styled.createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: ${Theme.background};
		color: ${Theme.text};
	}

	input,
	button {
		background-color: white;
		color: black;
		padding: 10px 20px;
		border: none;
		border-radius: ${Theme.radius};
		font-size: 0.9rem;

		&:focus {
			outline: 1px solid ${Theme.primary};
		}
	}

	button {
		cursor: pointer;
		font-weight: bold;
	}
`;
