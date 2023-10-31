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
	};
}

export const Field = ({ props: { field, labelText, placeholder, type } }: Props) => {
	const [fieldType, setFieldType] = useState(type);

	return (
		<StyledField>
			<label className="field-name" htmlFor={field}>
				{labelText}
			</label>

			{type === "text" && <input className="field" type={type} id={field} placeholder={placeholder} />}

			{type === "password" && (
				<div className="password-field">
					<input className="field" type={fieldType} id={field} placeholder={placeholder} />
					{fieldType === "password" && <AiFillEyeInvisible className="icon" onClick={() => setFieldType("text")} />}
					{fieldType === "text" && <AiFillEye className="icon" onClick={() => setFieldType("password")} />}
				</div>
			)}

			<span className="error"></span>
		</StyledField>
	);
};
