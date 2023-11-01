import { Theme } from "@/styles/theme";
import styled from "styled-components";

type Notification = "error" | "success";

export const StyledNotification = styled.div<{ type: Notification }>`
	--Type: ${({ type }) => Theme[type]};

	position: absolute;
	width: 100%;
	max-width: 400px;
	margin: 8px;
	padding: 10px 20px;
	box-shadow: 10px 10px 10px #00000030;
	border-radius: ${Theme.borderRadius};
	background-color: ${Theme.container};
	border: 2px solid ${Theme.border};
	border-left: 8px solid var(--Type);

	.top {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 8px;

		.title {
			color: var(--Type);
		}

		.close {
			border: none;

			&:hover {
				background-color: ${Theme.error};
				color: white;
			}
		}
	}

	.message {
		color: ${Theme.text + "90"};
	}
`;
