import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const CurrentGameStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 4rem 2rem;

	.close {
		position: absolute;
		top: 0;
		right: 0;
		background-color: transparent;
		color: ${Theme.text + "50"};
		margin: 2rem;
		font-size: 1.5rem;
		font-weight: normal;

		&:hover {
			background-color: ${Theme.error};
			color: white;
		}
	}

	.cover,
	.container {
		width: 40vw;
	}

	.cover {
		border: ${Theme.radius};
		overflow: hidden;
		height: auto;
		object-fit: cover;
		box-shadow: 20px 20px 20px #00000020;
	}

	.title {
		font-size: 1rem;
		font-weight: bold;
		margin-bottom: 4px;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		margin: 2rem 0;

		.date {
			font-size: 0.8rem;
			color: ${Theme.text + "50"};
		}
	}

	.collections {
		.description {
			color: ${Theme.text + "80"};
			font-size: 0.8rem;
			margin-bottom: 1rem;
		}

		.collections-container {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 4rem;

			.collection {
				font-size: 0.8rem;
				background-color: ${Theme.container};
				color: ${Theme.text};
				margin: 4px;
				opacity: 0.5;

				&:hover {
					opacity: 1;
				}
			}
		}
	}

	.save-game {
		background-color: ${Theme.primary};
		color: white;
		width: 15vw;
	}
`;
