"use client";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const CollectionContainerStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 8px;
	margin-bottom: 2.5rem;

	.collection {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;

		button {
			text-transform: capitalize;
			padding: 0;
			margin: 0;
			background-color: transparent;
			color: ${Theme.text + "50"};
			font-size: 1rem;

			&:hover:not(.active),
			&:focus:not(.active) {
				color: ${Theme.text};
				outline: none;
			}
		}

		.amount {
			background-color: ${Theme.background};
			border-radius: ${Theme.radius};
			padding: 4px 8px;
			font-size: 0.8rem;
		}

		.active {
			color: ${Theme.primary};
			outline: none;
		}
	}

	.collection:last-child {
		margin-bottom: 0;
	}
`;
