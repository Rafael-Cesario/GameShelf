import { IGame } from '@/interfaces/IGames';
import { StyledField } from './styles/styledField';
import { Dispatch, SetStateAction } from 'react';

interface FieldProps {
	props: {
		placeholder: string;
		gameValues: IGame;
		setGameValues: Dispatch<SetStateAction<IGame>>;
	};
}

export const Field = ({ props: { placeholder, gameValues, setGameValues } }: FieldProps) => {
	return (
		<StyledField>
			<input className="data-input" type="text" placeholder={placeholder} />
		</StyledField>
	);
};
