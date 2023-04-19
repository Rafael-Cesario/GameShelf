import { useState } from 'react';

export const DeleteMarker = () => {
	const [showDelete, setShowDelete] = useState(false);

	const deleteMarker = () => {
		return;
	};

	return (
		<>
			{showDelete || (
				<button
					onClick={() => setShowDelete(true)}
					className="delete">
					Excluir
				</button>
			)}

			{showDelete && (
				<button
					className="delete"
					autoFocus={true}
					onBlur={() => setShowDelete(false)}
					onClick={() => deleteMarker()}>
					Clique novamente para excluir esta lista
				</button>
			)}
		</>
	);
};
