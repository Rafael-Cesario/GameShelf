import { TextFieldStyled } from "./styles/text-field-styled";

interface Props {
	props: {
		fieldName: string;
		label: string;
		placeholder: string;
		error: string;
	};
}

export const TextField = ({ props: { error, fieldName, placeholder, label } }: Props) => {
	return (
		<TextFieldStyled>
			<label className="field-title" htmlFor={fieldName}>
				{label}
			</label>

			<input className="input" type="text" placeholder={placeholder} id={fieldName} />
			<span className="error">{error}</span>
		</TextFieldStyled>
	);
};
