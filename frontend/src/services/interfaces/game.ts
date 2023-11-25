export interface GameModel {
	userID: string;
	id: number;
	name: string;
	background_image: string;
	rating: number;
	released: string;
	collections: { id: string; name: string }[];
}

export interface GetGamesInput {
	userID: string;
}

export interface GetGameResponse {
	getGames: GameModel[];
}

export interface AddGameInput {
	addGameData: GameModel;
}
