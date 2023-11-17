import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const LoadingButtonStyled = styled.button`
	opacity: 0.5;
	background-color: ${Theme.primary};
	color: ${Theme.text};

	span {
		margin: 0 4px;
	}

	span:nth-child(1) {
		animation: loading 1s infinite;
	}

	span:nth-child(2) {
		animation: loading 1s 0.2s infinite;
	}

	span:nth-child(3) {
		animation: loading 1s 0.4s infinite;
	}

	@keyframes loading {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
`;
