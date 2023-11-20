import { BadRequestException, Injectable } from "@nestjs/common";
import { AddGameInput } from "./game.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GameService {
	constructor(private prisma: PrismaService) {}

	async addGame(addGameData: AddGameInput) {
		const { collections, id, userID } = addGameData;

		const isDuplicated = await this.prisma.game.findUnique({ where: { id } });
		if (isDuplicated) throw new BadRequestException("duplicated: This game was already added.");

		await this.prisma.game.create({ data: { id, userID, collections: { connect: [...collections] } } });
		return `Success: Your game was added to your collections and/or all games`;
	}
}
