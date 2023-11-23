import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const GamesContainerStyled = styled.div`
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
`;
