import { IMarker } from '@/interfaces/IMarkers';
import { useFilters } from '../../hooks/useFilters';
import { Filter } from './filter';
import { Dispatch, SetStateAction } from 'react';
import { StyledBuildMarker } from '../../styles/styledBuildMarker';

interface BuildMarkerProps {
	children: React.ReactNode;
	props: {
		values: IMarker;
		setValues: Dispatch<SetStateAction<IMarker>>;
		setIsOpen: (isOpen: boolean) => void;
		title: string;
		error: string;
	};
}

export const BuildMarker = ({ props: { values, setValues, setIsOpen, title, error }, children }: BuildMarkerProps) => {
	const { tags, genre, rates } = useFilters();

	return (
		<StyledBuildMarker>
			<div className="container">
				<div className="config-marker">
					<div className="title">
						<h1 role="title">{title}</h1>
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>
					</div>

					<span role="error" className="error">
						{error}
					</span>
					<input
						autoFocus={true}
						value={values.name}
						onChange={(e) => setValues({ ...values, name: e.target.value })}
						className="name"
						type="text"
						placeholder="Nome"
						role="marker-name"
					/>

					<Filter props={{ title: 'Tags', filterName: 'tags', filters: tags, values, setValues }} />
					<Filter props={{ title: 'Gêneros', filterName: 'genre', filters: genre, values, setValues }} />
					<Filter props={{ title: 'Nota', filterName: 'rate', filters: rates, values, setValues }} />

					{children}
				</div>
			</div>
		</StyledBuildMarker>
	);
};
