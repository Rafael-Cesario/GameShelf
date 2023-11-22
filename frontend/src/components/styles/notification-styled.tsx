"use client";

type NotificationTypes = "success" | "error";

import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const NotificationStyled = styled.div<{ type: NotificationTypes }>`
	--type: ${({ type }) => (type === "success" ? Theme.success : Theme.error)};

	position: absolute;
	top: 0;
	right: 0;
	margin: 1rem;
	padding: 1rem 2rem;
	width: 100%;
	max-width: 500px;
	min-width: 300px;
	border-radius: ${Theme.radius};
	background-color: #151515;
	border-left: 0.8rem solid var(--type);
	z-index: 2;

	.top {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.title {
			margin: 0;
			color: var(--type);
		}

		.close {
			background-color: transparent;
			color: #fff;
			font-size: 1rem;

			&:hover {
				background-color: ${Theme.error};
				color: white;
			}
		}
	}

	.message {
		margin-top: 8px;
	}
`;
