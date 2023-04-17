export interface IGame {
	name: string;
	release: string;
	rate: string;
	cover: string;
	tags: string[];
	genre: string[];
}

export interface IGetGames {
	email: string;
}

export interface IAddGame {
	addGame: { email: string; game: IGame };
}

export interface IRemoveGame {
	removeGame: { email: string; gameName: string };
}

export interface IUpdateGame {
	updateGame: { email: string; gameName: string; update: IGame };
}

export interface ResponseGetGames {
	getGames: { games: IGame[] };
}

export interface ResponseAddGame {
	addGames: { newGames: IGame[] };
}

export interface ResponseRemoveGame {
	removeGames: { newGames: IGame[] };
}

export interface ResponseUpdateGame {
	updateGame: { newGames: IGame[] };
}
