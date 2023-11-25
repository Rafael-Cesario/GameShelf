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

	.close {
		align-self: flex-end;
		margin: 2rem;
	}

	.cover {
		width: 30vw;
		height: auto;
		object-fit: cover;
		border-radius: ${Theme.radius};
		margin-bottom: 2rem;
	}

	.info {
		width: 30vw;

		.name {
			font-size: 1.2rem;
		}

		.date {
			font-size: 0.8rem;
			color: ${Theme.text + "50"};
		}
	}
`;
