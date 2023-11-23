"use client";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const AddGameStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: ${Theme.background};

	.top {
		display: flex;
		justify-content: space-between;
		margin: 4rem 8rem;

		.title {
			font-size: 1.2rem;
		}

		.add-game {
			background-color: transparent;

			input {
				width: 30vw;
				min-width: 300px;
				margin-right: 1rem;
				background-color: ${Theme.container};
				color: ${Theme.text};
			}

			.search {
				background-color: ${Theme.primary};
				color: ${Theme.text};

				&:hover {
					opacity: 0.8;
				}
			}
		}

		.close {
			background-color: transparent;
			font-size: 1.5rem;
			font-weight: normal;
			color: ${Theme.text};

			&:hover {
				background-color: ${Theme.error};
				color: white;
			}
		}
	}

	.games-container {
		margin: 1rem;
		margin-top: 8rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, min(400px));
		column-gap: 2rem;
		row-gap: 2rem;
		justify-content: center;

		.game {
			width: 400px;
			height: fit-content;
			transition: 0.2s;
			cursor: pointer;

			&:hover {
				transform: scale(1.05);
			}

			.info {
				padding: 4px 8px;
			}

			.title {
				font-size: 1rem;
				font-weight: normal;
			}

			.date {
				font-size: 0.8rem;
				color: ${Theme.text + "50"};
			}

			.cover {
				width: 400px;
				height: 210px;
				object-fit: cover;
				border-radius: ${Theme.radius};
			}
		}
	}
`;
