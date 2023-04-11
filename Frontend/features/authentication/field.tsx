import { useState } from 'react';
import { IFieldProps } from './interfaces/fieldProps';
import { StyledField } from './styles/styledField';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

export const Field = ({ props: { name, type, placeholder, error, value, changeValue } }: IFieldProps) => {
	const [currentType, setCurrentType] = useState(type);

	return (
		<StyledField>
			<label htmlFor={name}>{error}</label>

			<div className="input">
				<input type={currentType} id={name} placeholder={placeholder} value={value} onChange={(e) => changeValue(e.target.value, name)} />
				{type === 'password' && currentType === 'password' && <AiFillEyeInvisible onClick={() => setCurrentType('text')} className="icon" />}
				{type === 'password' && currentType === 'text' && <AiFillEye onClick={() => setCurrentType('password')} className="icon" />}
			</div>
		</StyledField>
	);
};
