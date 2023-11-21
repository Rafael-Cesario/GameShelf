import request from "supertest-graphql";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { UserModel } from "src/models/user/user.model";
import { PrismaService } from "src/prisma.service";
import { gameQueries } from "./queries/game";
import { AddGameInput, UpdateGameInput } from "src/models/game/game.dto";
import { GameModel } from "src/models/game/game.model";

describe("Game e2e", () => {
	const collections = [];
	let app: INestApplication;
	let prisma: PrismaService;
	let user: UserModel;

	const createUser = async () => {
		const user = await prisma.user.create({ data: { email: "user@email.com", password: "123" } });
		return user;
	};

	const createCollections = async () => {
		await prisma.collection.createMany({
			data: [
				{ name: "collection 01", userID: user.id },
				{ name: "collection 02", userID: user.id },
				{ name: "collection 03", userID: user.id },
				{ name: "collection 04", userID: user.id },
			],
		});

		const allCollections = await prisma.collection.findMany();
		collections.push(...allCollections);
	};

	const addGameRequest = async (addGameData: AddGameInput) => {
		const { data, errors } = await request<{ addGame: GameModel }>(app.getHttpServer()).mutate(gameQueries.ADD_GAME).variables({ addGameData });
		return { data, errors };
	};

	const getGamesRequest = async (userID: string) => {
		const { data, errors } = await request<{ getGames: [] }>(app.getHttpServer()).query(gameQueries.GET_GAMES).variables({ userID });
		return { data, errors };
	};

	const updateGameRequest = async (updateGameData: UpdateGameInput) => {
		const { data, errors } = await request<{ updateGame: { collections: [] } }>(app.getHttpServer()).mutate(gameQueries.UPDATE_GAME).variables({ updateGameData });
		return { data, errors };
	};

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
		prisma = moduleRef.get(PrismaService);
		app = moduleRef.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ transform: true }));
		await app.init();

		user = await createUser();
		await createCollections();
	});

	afterAll(async () => {
		await prisma.collection.deleteMany();
		await prisma.user.deleteMany();
	});

	describe("Add Game", () => {
		afterEach(async () => {
			await prisma.game.deleteMany();
		});

		it("Add a new game to many collections", async () => {
			const { data } = await addGameRequest({
				id: "1",
				userID: user.id,
				collections: [{ id: collections[0].id }, { id: collections[1].id }],
			});

			expect(data).toHaveProperty("addGame", "Success: Your game was added to your collections and/or all games");

			const dbGame = await prisma.game.findUnique({ where: { id: "1" }, include: { collections: true } });
			expect(dbGame.collections).toHaveLength(2);

			const dbCollection = await prisma.collection.findUnique({ where: { id: collections[0].id }, include: { games: true } });
			expect(dbCollection.games).toHaveLength(1);
		});
	});

	describe("Get games", () => {
		beforeEach(async () => {
			await addGameRequest({ id: "1", userID: user.id, collections: [{ id: collections[0].id }] });
			await addGameRequest({ id: "2", userID: user.id, collections: [{ id: collections[0].id }] });
		});

		afterEach(async () => {
			await prisma.game.deleteMany();
		});

		it("Get all user's game", async () => {
			const { data } = await getGamesRequest(user.id);
			expect(data).toHaveProperty(["getGames", 0, "id"], "1");
			expect(data).toHaveProperty(["getGames", 0, "collections", 0, "id"], collections[0].id);
			expect(data.getGames.length).toBe(2);
		});
	});

	describe("Update game", () => {
		const games: { id: string }[] = [];

		beforeEach(async () => {
			const game = await prisma.game.create({ data: { id: "1", userID: user.id } });
			games.push(game);
		});

		afterEach(async () => {
			await prisma.game.deleteMany();
		});

		it("Update game's collections", async () => {
			const addCollection = await updateGameRequest({
				gameID: games[0].id,
				addCollections: [{ id: collections[0].id }],
				removeCollections: [],
			});

			expect(addCollection.data.updateGame.collections.length).toBe(1);

			const removeCollection = await updateGameRequest({
				gameID: games[0].id,
				addCollections: [],
				removeCollections: [{ id: collections[0].id }],
			});

			expect(removeCollection.data.updateGame.collections.length).toBe(0);
		});
	});
});
