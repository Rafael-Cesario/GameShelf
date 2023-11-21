import { CollectionModel } from "./collection";

export interface GameModel {
	id: string;
	userID: string;
	collections: CollectionModel[];
}
