import { LoadingButtonStyled } from "./styles/loding-button-styled";

export const LoadingButton = ({ className }: { className: string }) => {
	return (
		<LoadingButtonStyled className={className}>
			<span>-</span>
			<span>-</span>
			<span>-</span>
		</LoadingButtonStyled>
	);
};
