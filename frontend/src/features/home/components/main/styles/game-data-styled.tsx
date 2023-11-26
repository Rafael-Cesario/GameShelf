import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const GameDataStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: ${Theme.background};

	display: flex;
	flex-direction: column;
	align-items: center;

	.info,
	.cover,
	.buttons {
		width: 30vw;
	}

	.close {
		align-self: flex-end;
		margin: 2rem;
	}

	.cover {
		height: auto;
		object-fit: cover;
		border-radius: ${Theme.radius};
		margin-bottom: 2rem;
	}

	.info {
		.name {
			font-size: 1.2rem;
		}

		.date {
			font-size: 0.8rem;
			color: ${Theme.text + "50"};
		}
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		button:nth-child(1) {
			background-color: ${Theme.primary};
			color: ${Theme.text};
		}

		button:nth-child(2) {
			background-color: ${Theme.error};
			color: white;
		}
	}
`;
