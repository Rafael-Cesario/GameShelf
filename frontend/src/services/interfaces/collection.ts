import { GameModel } from "./game";

export interface CollectionModel {
	userID: string;
	id: string;
	name: string;
	games: GameModel[];
}

export interface CreateCollectionInput {
	createCollectionData: {
		userID: string;
		name: string;
	};
}

export interface CreateCollectionResponse {
	createCollection: {
		userID: string;
		id: string;
		name: string;
		games: GameModel[];
	};
}
