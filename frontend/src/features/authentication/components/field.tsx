import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FieldStyled } from "./styles/field-styled";

interface Props {
	props: {
		fieldName: string;
		label: string;
		placeholder: string;
		error: string;
		value: string;
		onChange: (value: string) => void;
		type: "text" | "password";
	};
}

export const Field = ({ props: { value, onChange, error, fieldName, placeholder, label, type } }: Props) => {
	const [showPassword, setShowPassword] = useState(false);
	const currentType = showPassword ? "text" : type === "password" ? "password" : "text";

	return (
		<FieldStyled>
			<label className="field-title" htmlFor={fieldName}>
				{label}
			</label>

			<div className="container">
				<input data-cy={`input-${fieldName}`} value={value} onChange={(e) => onChange(e.target.value)} className="input" type={currentType} placeholder={placeholder} id={fieldName} />

				{type === "password" && (
					<button type="button" onClick={() => setShowPassword(!showPassword)}>
						{showPassword && <IoMdEye className="icon" />}
						{showPassword || <IoMdEyeOff className="icon" />}
					</button>
				)}
			</div>

			<span data-cy={`error-${fieldName}`} className="error">
				{error}
			</span>
		</FieldStyled>
	);
};
