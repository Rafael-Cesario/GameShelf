import { StyledField } from './styles/styledField';

export const Field = ({ placeholder }: { placeholder: string }) => {
	return (
		<StyledField>
			<input className="data-input" type="text" placeholder={placeholder} />
		</StyledField>
	);
};
