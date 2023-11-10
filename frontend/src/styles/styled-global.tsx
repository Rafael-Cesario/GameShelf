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
		background-color: ${Theme.background};
		color: ${Theme.text};
	}

	button {
		border: none;
		padding: 10px 20px;
		background-color: white;
		color: black;
		font-weight: bold;
		font-size: 0.9rem;
		margin: 4px;
		border-radius: ${Theme.radius};
	}
`;
