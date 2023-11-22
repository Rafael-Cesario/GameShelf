"use client";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const HeaderStyled = styled.header`
	margin: 2.5rem 2rem;
	margin-right: 4rem;

	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	height: fit-content;

	.current-collection {
		margin-right: 4rem;

		.name {
			font-size: 1.2rem;
		}

		.games {
			color: ${Theme.text + "50"};
			font-size: 0.8rem;
		}
	}

	.search-games {
		background-color: ${Theme.container};
		color: ${Theme.text};
		width: 40vw;
		max-width: 500px;
	}

	.menu {
		background-color: transparent;
		color: ${Theme.text + "80"};
		margin: 0 4px;

		&:hover {
			background-color: ${Theme.container};
			color: ${Theme.text};
		}
	}

	.add-game {
		background-color: ${Theme.primary};
		color: ${Theme.text};
	}

	@media (max-width: 1600px) {
		.search-games {
			display: block;
			width: 100%;
			margin: 1rem 0;
		}
	}

	@media (max-width: 1435px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
`;
