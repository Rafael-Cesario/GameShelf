"use client";

import styled from "styled-components";

export const HomeStyled = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr;

	.sidebar {
		grid-row: 1 / 3;
	}
`;
