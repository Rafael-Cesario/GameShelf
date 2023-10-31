"use client";

import { useState } from "react";
import { StyledField } from "./styles/styled-field";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface Props {
	props: {
		field: string;
		labelText: string;
		placeholder: string;
		type: "text" | "password";
		onChange(field: string, value: string): void;
		error: string;
	};
}

export const Field = ({ props: { field, labelText, placeholder, type, onChange, error } }: Props) => {
	const [fieldType, setFieldType] = useState(type);

	const Input = <input onChange={(e) => onChange(field, e.target.value)} className="field" type={fieldType} id={field} placeholder={placeholder} />;

	return (
		<StyledField>
			<label className="field-name" htmlFor={field}>
				{labelText}
			</label>

			{type === "text" && Input}

			{type === "password" && (
				<div className="password-field">
					{Input}
					{fieldType === "password" && <AiFillEyeInvisible className="icon" onClick={() => setFieldType("text")} />}
					{fieldType === "text" && <AiFillEye className="icon" onClick={() => setFieldType("password")} />}
				</div>
			)}

			<span className="error">{error}</span>
		</StyledField>
	);
};
