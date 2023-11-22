import { CollectionModel } from "./collection";

export interface GameModel {
	id: string;
	userID: string;
	collections: CollectionModel[];
}

export interface GetGamesInput {
	userID: string;
}

export interface GetGameResponse {
	getGames: GameModel[];
}
