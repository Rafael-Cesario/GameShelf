import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const CreateCollectionStyled = styled.div`
	position: absolute;
	background-color: #11111180;
	backdrop-filter: blur(5px);
	width: 100%;
	min-height: 100%;
	top: 0;
	left: 0;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.container {
		width: 50vw;
		height: 50vh;
		background-color: ${Theme.container};
		border-radius: ${Theme.radius};
		padding: 4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		position: relative;

		.field {
			width: 100%;
			max-width: 300px;

			.field-title {
				font-size: 0.8rem;
				color: ${Theme.text + "50"};
				display: block;
				padding: 10px 20px;
				font-weight: bold;
			}

			#collection-name {
				background-color: ${Theme.background};
				width: 100%;
				font-weight: bold;
				margin-bottom: 2rem;
				color: ${Theme.text};
			}
		}

		.submit {
			width: 100%;
			max-width: 300px;
			background-color: ${Theme.primary};
			color: ${Theme.text};
		}

		.close {
			position: absolute;
			top: 0;
			right: 0;
			margin: 2rem;
			background-color: transparent;
			font-size: 1.2rem;
			color: ${Theme.text + "50"};

			&:hover {
				background-color: ${Theme.error};
				color: white;
			}
		}
	}
`;
