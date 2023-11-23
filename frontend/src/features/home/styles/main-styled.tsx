import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const MainStyled = styled.main`
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;

	.game {
		margin: 8px;
		width: 15vw;

		.cover {
			width: inherit;
			height: auto;
			object-fit: cover;
			border-radius: ${Theme.radius};
			box-shadow: 5px 5px 5px #44444410;
		}

		.name {
			font-size: 0.8rem;
			font-weight: normal;
			margin: 8px;
			color: ${Theme.text + "80"};
		}
	}
`;
