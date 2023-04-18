import styled from 'styled-components';

export const StyledLoading = styled.div`
	margin: 1rem 0;
	font-weight: bold;

	span:nth-child(1) {
		animation: show 1s infinite;
	}

	span:nth-child(2) {
		animation: show 1s 0.1s infinite;
	}

	span:nth-child(3) {
		animation: show 1s 0.2s infinite;
	}

	@keyframes show {
		0% {
			opacity: 0;
		}

		90% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
`;
