import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const SearchGameStyled = styled.div`
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
`;
