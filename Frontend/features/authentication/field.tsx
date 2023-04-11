import { IFieldProps } from './interfaces/fieldProps';

export const Field = ({ props: { name, type, placeholder, error, value, changeValue } }: IFieldProps) => {
	return (
		<div className="field">
			<label htmlFor={name}>{error}</label>
			<input type={type} id={name} placeholder={placeholder} value={value} onChange={(e) => changeValue(e.target.value, name)} />
		</div>
	);
};
