import request from "supertest-graphql";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { UserModel } from "src/models/user/user.model";
import { PrismaService } from "src/prisma.service";
import { collectionQueries } from "./queries/collection";
import { CreateCollectionInput, UpdateCollectionInput } from "src/models/collection/collection.dto";
import { CollectionModel } from "src/models/collection/collection.model";

describe("Collection e2e", () => {
	let prisma: PrismaService;
	let app: INestApplication;
	let user: UserModel;

	const createUser = async () => {
		const user = await prisma.user.create({ data: { email: "user@email.com", password: "123" } });
		return user;
	};

	const createCollection = async (createCollectionData: CreateCollectionInput) => {
		const { data, errors } = await request<{ createCollection: CollectionModel }>(app.getHttpServer()).mutate(collectionQueries.CREATE_COLLECTION).variables({ createCollectionData });
		return { data, errors };
	};

	const getCollections = async (userID: string) => {
		const { data, errors } = await request(app.getHttpServer()).mutate(collectionQueries.GET_COLLECTIONS).variables({ userID });
		return { data, errors };
	};

	const updateCollection = async (updateCollectionData: UpdateCollectionInput) => {
		const { data, errors } = await request(app.getHttpServer()).mutate(collectionQueries.UPDATE_COLLECTION).variables({ updateCollectionData });
		return { data, errors };
	};

	const deleteCollection = async (collectionID: string) => {
		const { data, errors } = await request(app.getHttpServer()).mutate(collectionQueries.DELETE_COLLECTION).variables({ collectionID });
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

	describe("Update collection", () => {
		const collections: CollectionModel[] = [];

		beforeAll(async () => {
			for (let i = 0; i < 5; i++) {
				const { data } = await createCollection({ name: `Collection ${i}`, userID: user.id });
				collections.push(data.createCollection);
			}
		});

		afterAll(async () => {
			await prisma.collection.deleteMany();
		});

		it("Throws an error: collection not found", async () => {
			const { errors } = await updateCollection({ name: "new name", id: "123" });
			expect(errors[0]).toHaveProperty("message", "notFound: Collection not found");
		});

		it("Rename a collection", async () => {
			const name = "NEW NAME";
			const { data } = await updateCollection({ name, id: collections[0].id });
			expect(data).toHaveProperty(["updateCollection", "name"], name.toLowerCase());
		});
	});

	describe("Delete collection", () => {
		let collection: CollectionModel;

		beforeAll(async () => {
			const response = await createCollection({ userID: user.id, name: "collection 01" });
			collection = response.data.createCollection;
		});

		afterAll(async () => {
			await prisma.collection.deleteMany();
		});

		it("Delete collection from database", async () => {
			const { data } = await deleteCollection(collection.id);
			expect(data).toHaveProperty("deleteCollection", "Collection 01 was deleted from database.");
		});
	});
});
