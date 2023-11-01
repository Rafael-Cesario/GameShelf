import styled from "styled-components";

export const StyledLoadingButton = styled.div`
	font-size: 1.8rem;
	text-align: center;

	span:nth-child(1) {
		animation: loading 1s infinite;
	}

	span:nth-child(2) {
		animation: loading 1s 0.1s infinite;
	}

	span:nth-child(3) {
		animation: loading 1s 0.2s infinite;
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
