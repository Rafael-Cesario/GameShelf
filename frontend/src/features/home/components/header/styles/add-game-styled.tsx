"use client";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const AddGameStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: ${Theme.background + "90"};
	backdrop-filter: blur(4px);

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4rem;

	.close {
		background-color: transparent;
		color: ${Theme.text};
		font-size: 1.5rem;
		text-align: right;
		margin-bottom: 1rem;

		&:hover {
			background-color: ${Theme.error};
			color: white;
		}
	}

	.field {
		display: flex;
		justify-content: center;
		width: 100%;

		.name {
			width: 100%;
			max-width: 800px;
			height: 50px;
			background-color: ${Theme.container};
			border: 2px solid #22222250;
			color: ${Theme.text};
			margin-right: 1rem;
		}
	}

	.games-container {
		border: 2px solid #22222250;
		min-height: 60vh;
		background-color: ${Theme.container};
		margin: 4rem 0;
		border-radius: ${Theme.radius};

		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-content: center;
		column-gap: 2rem;
		row-gap: 2rem;
		padding: 2rem;

		.game {
			position: relative;

			.title {
				position: absolute;
				bottom: 0;
				font-size: 1rem;
				font-weight: normal;
				background-color: ${Theme.container};
				border-radius: ${Theme.radius};
				margin: 8px;
				padding: 10px 20px;
			}

			.add-game {
				position: absolute;
				bottom: 0;
				right: 0;
				margin: 8px;
			}

			.cover {
				width: 500px;
				height: 300px;
				object-fit: cover;
				border-radius: ${Theme.radius};
			}
		}
	}
`;
