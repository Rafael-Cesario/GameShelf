import { TextFieldStyled } from "./styles/text-field-styled";

interface Props {
	props: {
		fieldName: string;
		label: string;
		placeholder: string;
		error: string;
		value: string;
		onChange: (value: string) => void;
	};
}

export const TextField = ({ props: { value, onChange, error, fieldName, placeholder, label } }: Props) => {
	return (
		<TextFieldStyled>
			<label className="field-title" htmlFor={fieldName}>
				{label}
			</label>

			<input value={value} onChange={(e) => onChange(e.target.value)} className="input" type="text" placeholder={placeholder} id={fieldName} />
			<span className="error">{error}</span>
		</TextFieldStyled>
	);
};
