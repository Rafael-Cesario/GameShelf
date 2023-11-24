import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const ConfigsStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: ${Theme.background};
	padding: 4rem;

	display: grid;
	grid-template-columns: repeat(3, 1fr);

	.title {
		grid-area: 1 / 2;
		text-align: center;
		font-size: 1rem;
		color: ${Theme.text};
	}

	.close {
		grid-area: 1 / 3;
		font-size: 1.2rem;
		width: fit-content;
		height: fit-content;
		justify-self: right;
		background-color: transparent;
		color: ${Theme.text + "50"};

		&:hover {
			background-color: ${Theme.error};
			color: white;
		}
	}

	.field {
		grid-area: 2/ 2;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.collection-name {
			color: ${Theme.text + "50"};
			font-size: 0.8rem;
			margin: 10px 20px;
		}

		#collection-name {
			background-color: ${Theme.container};
			color: ${Theme.text};
		}

		.save {
			margin-top: 4rem;
			background-color: ${Theme.primary};
			opacity: 0.8;
			color: ${Theme.text};

			&:hover {
				opacity: 1;
			}
		}

		.error {
			margin: 10px 20px;
			font-size: 0.8rem;
			color: ${Theme.error};
		}
	}

	.delete {
		grid-area: 3 / 3;
		width: fit-content;
		height: fit-content;
		justify-self: right;
		align-self: flex-end;
		background-color: ${Theme.error};
		color: white;
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	}

	.check-delete {
		grid-area: 3 / 3;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;

		.error {
			font-size: 1rem;
			color: ${Theme.error};
		}

		.cancel {
			background-color: ${Theme.container};
			color: ${Theme.text};
		}

		.cancel,
		.delete {
			margin: 1rem 0;
			width: 100%;
			opacity: 1;
		}
	}
`;
