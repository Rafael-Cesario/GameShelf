import { StyledContainer } from "./styles/styledContainer";

export const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledContainer>
			<div className="container">{children}</div>
		</StyledContainer>
	);
};
