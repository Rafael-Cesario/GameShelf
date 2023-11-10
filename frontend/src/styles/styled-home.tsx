"use client";
import styled from "styled-components";
import { Theme } from "./theme";

export const StyledHeader = styled.header`
	margin: 2rem;
	display: flex;
	justify-content: flex-end;

	button {
		background-color: transparent;
		color: ${Theme.text + "80"};
		font-size: 0.8rem;

		&:hover {
			background-color: white;
			color: black;
		}
	}
`;

export const StyledMain = styled.main`
	height: 70vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 2rem 10vw;
	max-width: 600px;

	.name {
		font-size: 4rem;
		margin-bottom: 4rem;
	}

	.title {
		margin-bottom: 1rem;
		color: ${Theme.text};
	}

	.text {
		margin-bottom: 2rem;
		color: ${Theme.text + "90"};
	}

	.games {
		background-color: ${Theme.primary};
		color: ${Theme.text};
		width: fit-content;

		&:hover {
			background-color: white;
			color: black;
		}
	}
`;
