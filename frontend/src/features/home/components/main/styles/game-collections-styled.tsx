import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const GameCollectionsStyled = styled.div`
	margin: 4rem 0;
	width: 30vw;

	.title {
		font-size: 1rem;
		margin: 4px 0;
	}

	.description {
		font-size: 0.8rem;
		color: ${Theme.text + "50"};
	}

	.empty {
		font-size: 0.8rem;
		color: ${Theme.text};
		margin: 1rem 0;
	}

	.collections-container {
		margin: 2rem 0;
		display: flex;
		flex-wrap: wrap;

		.collection {
			text-transform: capitalize;
			margin: 4px;
			background-color: ${Theme.primary};
			color: white;
			text-align: center;
			border-radius: ${Theme.radius};
			padding: 5px 10px;
			font-size: 0.8rem;
			opacity: 0.4;
			cursor: pointer;
		}

		.active {
			opacity: 1;
		}
	}
`;
