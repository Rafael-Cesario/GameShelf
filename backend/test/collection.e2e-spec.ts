import request from "supertest-graphql";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { UserModel } from "src/models/user/user.model";
import { PrismaService } from "src/prisma.service";
import { collectionQueries } from "./queries/collection";
import { CreateCollectionInput } from "src/models/collection/collection.dto";

describe("Collection e2e", () => {
	let prisma: PrismaService;
	let app: INestApplication;
	let user: UserModel;

	const createUser = async () => {
		const user = await prisma.user.create({ data: { email: "user@email.com", password: "123" } });
		return user;
	};

	const createCollection = async (createCollectionData: CreateCollectionInput) => {
		const { data, errors } = await request(app.getHttpServer()).mutate(collectionQueries.CREATE_COLLECTION).variables({ createCollectionData });
		return { data, errors };
	};

	const getCollections = async (userID: string) => {
		const { data, errors } = await request(app.getHttpServer()).mutate(collectionQueries.GET_COLLECTIONS).variables({ userID });
		return { data, errors };
	};

	beforeAll(async () => {
		const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
		prisma = await module.get(PrismaService);
		app = module.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ transform: true }));
		await app.init();

		user = await createUser();
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
	});

	describe("Create collection", () => {
		afterEach(async () => {
			await prisma.collection.deleteMany();
		});

		it("Throws an error: user not found", async () => {
			const { errors } = await createCollection({ name: "Collection 01", userID: "123" });
			expect(errors[0].message).toBe("notFound: User ID not found");
		});

		it("Throws an error: duplicated collection", async () => {
			await createCollection({ name: "collection 01", userID: user.id });
			const { errors } = await createCollection({ name: "collection 01", userID: user.id });
			expect(errors[0].message).toBe("duplicated: A collection with the same name already exist.");
		});

		it("Throws an error: short name", async () => {
			const { errors } = await createCollection({ name: "Q", userID: user.id });
			expect(errors[0]).toHaveProperty(["errors", "message", 0], "name must be longer than or equal to 3 characters");
		});

		it("Throws an error: long name", async () => {
			const { errors } = await createCollection({ name: "qweqweqweqweqweqweqwe", userID: user.id });
			expect(errors[0]).toHaveProperty(["errors", "message", 0], "name must be shorter than or equal to 20 characters");
		});

		it("Creates a new collecton", async () => {
			const collectionName = "my collection";
			const { data } = await createCollection({ name: collectionName.toUpperCase(), userID: user.id });

			expect(data).toEqual({
				createCollection: {
					userID: user.id,
					id: expect.any(String),
					name: collectionName,
				},
			});
		});
	});

	describe("Get Collections", () => {
		const collectionsLength = 5;

		beforeAll(async () => {
			for (let i = 0; i < collectionsLength; i++) {
				await createCollection({ name: `Collection ${i}`, userID: user.id });
			}
		});

		afterAll(async () => {
			await prisma.collection.deleteMany();
		});

		it("Get collections", async () => {
			const { data } = (await getCollections(user.id)) as { data: { getCollections: [] } };
			expect(data).toHaveProperty("getCollections");
			expect(data.getCollections).toHaveLength(collectionsLength);
		});

		it("Throws an error: user not found", async () => {
			const { errors } = await getCollections("123");
			expect(errors[0]).toHaveProperty(["message"], "notFound: User ID not found");
		});
	});

	// describe("Update collection", () => {});

	// describe("Delete collection", () => {});
});
