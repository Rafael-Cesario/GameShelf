import { useEffect } from 'react';

export const useShortcuts = (shortcuts: (e: KeyboardEvent) => void) => {
	useEffect(() => {
		document.addEventListener('keyup', shortcuts);

		return () => {
			document.removeEventListener('keyup', shortcuts);
		};
	}, []);
};
