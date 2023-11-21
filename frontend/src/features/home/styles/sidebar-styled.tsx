"use client";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const SidebarStyled = styled.div`
	background-color: ${Theme.container};
	padding: 3rem 2rem;
	margin-right: 2rem;
	min-height: 100vh;

	width: 30vw;
	max-width: 350px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.title,
	.search-collection,
	.collection-container {
		margin-bottom: 2.5rem;
	}

	.title {
		font-size: 1.1rem;
	}

	.search-collection {
		background-color: ${Theme.background};
		font-weight: bold;
		width: 100%;
		color: ${Theme.text};
	}

	.collection-container {
		display: flex;
		flex-direction: column;
		padding: 0 8px;

		.collection {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 0.5rem;

			button {
				padding: 0;
				margin: 0;
				background-color: transparent;
				color: ${Theme.text + "50"};
				font-size: 1rem;

				&:hover {
					color: ${Theme.text};
				}
			}

			.active {
				color: ${Theme.primary};
			}

			.amount {
				background-color: ${Theme.background};
				border-radius: ${Theme.radius};
				padding: 4px 8px;
				font-size: 0.8rem;
			}
		}

		.collection:last-child {
			margin-bottom: 0;
		}
	}

	.create-collection {
		width: 100%;
		background-color: ${Theme.primary};
		color: ${Theme.text};

		&:hover {
			opacity: 0.8;
		}
	}

	.logout {
		border-top: 4px solid ${Theme.text + "10"};
		background-color: transparent;
		color: ${Theme.text + "50"};
		padding-top: 1rem;
		margin-top: 1rem;
		border-radius: 0;

		&:hover {
			color: white;
		}
	}
`;
