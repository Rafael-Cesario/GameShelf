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

	input {
		border: none;
		padding: 10px 20px;
		background-color: ${Theme.container};
		color: ${Theme.text};
	}
`;
