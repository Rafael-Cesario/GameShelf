import request from "supertest-graphql";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { userQueries } from "./queries/user";
import { PrismaService } from "src/prisma.service";

describe("User", () => {
	const userData = { email: "USER01@EMAIL.COM", password: "MyPassword123" };
	let app: INestApplication;
	let prisma: PrismaService;

	const createUserRequest = async (createUserData: { email: string; password: string }) => {
		return await request(app.getHttpServer()).mutate(userQueries.CREATE_USER).variables({ createUserData });
	};

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
		prisma = moduleRef.get(PrismaService);
		app = moduleRef.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ transform: true }));
		await app.init();
	});

	afterEach(async () => {
		await prisma.user.deleteMany();
	});

	it("Creates a new user", async () => {
		const { data } = await createUserRequest(userData);
		const dbUser = await prisma.user.findFirst({ where: { email: userData.email.toLowerCase() } });

		expect(data).toEqual({ createUser: "Success: A new user was created" });

		expect(dbUser).toEqual({
			id: expect.any(String),
			email: expect.stringContaining(userData.email.toLowerCase()),
			password: expect.not.stringContaining(userData.password),
		});
	});

	it("Throws an error if email is invalid", async () => {
		const { errors } = await createUserRequest({ email: "notValid", password: "MyPassword123" });
		expect(errors[0]).toHaveProperty(["errors", "message", 0], "email must be an email");
	});

	it("Throws an error if the password is less than 10 characters", async () => {
		const { errors } = await createUserRequest({ email: "user01@email.com", password: "123" });
		expect(errors[0]).toHaveProperty(["errors", "message", 0], "password must be longer than or equal to 10 characters");
	});

	it("Throws an error if email is already in use", async () => {
		await createUserRequest(userData);
		const { errors } = await createUserRequest(userData);
		expect(errors[0]).toHaveProperty(["errors", "message", 0], "Duplicated: A user with the same name already exist");
	});
});
