import { BadRequestException, Injectable } from "@nestjs/common";
import { AddGameInput, UpdateGameInput } from "./game.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GameService {
	constructor(private prisma: PrismaService) {}

	async addGame(addGameData: AddGameInput) {
		const { collections, id } = addGameData;

		const isDuplicated = await this.prisma.game.findUnique({ where: { id } });
		if (isDuplicated) throw new BadRequestException("duplicated: This game was already added.");

		await this.prisma.game.create({ data: { ...addGameData, collections: { connect: [...collections] } } });
		return `Success: Your game was added to your collections and/or all games`;
	}

	async getGames(userID: string) {
		const { games } = await this.prisma.user.findUnique({
			where: { id: userID },
			include: { games: { include: { collections: true } } },
		});

		return games;
	}

	async updateGame(updateGameData: UpdateGameInput) {
		const { gameID, addCollections, removeCollections } = updateGameData;

		const game = await this.prisma.game.update({
			where: { id: gameID },
			data: { collections: { connect: [...addCollections], disconnect: [...removeCollections] } },
			include: { collections: true },
		});

		return game;
	}

	async removeGame(gameID: number) {
		await this.prisma.game.delete({ where: { id: gameID } });
		return "Success: Game removed from games";
	}
}
