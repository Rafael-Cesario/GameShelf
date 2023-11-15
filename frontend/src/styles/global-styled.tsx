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
`;
