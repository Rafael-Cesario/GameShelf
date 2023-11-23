import { CollectionModel } from "./collection";

export interface GameModel {
	id: number;
	name: string;
	background_image: string;
	rating: number;
	released: string;
	collections: CollectionModel[];
}

export interface GetGamesInput {
	userID: string;
}

export interface GetGameResponse {
	getGames: GameModel[];
}
