import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		mainBackground: string;
		mainText: string;
		fontFamily: string;
		containerBackground: string;
		containerBorder: string;
		borderRadius: string;
		insideContainer: string;
		placeHolder: string;
		fadedText: string;
		primary: string;
		textRed: string;
		padding: string;
	}
}
