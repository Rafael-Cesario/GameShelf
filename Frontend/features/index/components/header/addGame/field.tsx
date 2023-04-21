import { IGame } from '@/interfaces/IGames';
import { StyledField } from './styles/styledField';
import { Dispatch, SetStateAction } from 'react';

interface FieldProps {
	props: {
		placeholder: string;
		gameValues: IGame;
		fieldName: 'name' | 'cover' | 'release';
		setGameValues: Dispatch<SetStateAction<IGame>>;
	};
}

export const Field = ({ props: { placeholder, gameValues, setGameValues, fieldName } }: FieldProps) => {
	return (
		<StyledField>
			<input
				className="data-input"
				type="text"
				placeholder={placeholder}
				value={gameValues[fieldName]}
				onChange={(e) => setGameValues({ ...gameValues, [fieldName]: e.target.value })}
			/>
		</StyledField>
	);
};
