import request from "supertest-graphql";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { userQueries } from "./queries/user";
import { PrismaService } from "src/prisma.service";

describe("User", () => {
	const userData = { email: "user01@email.com", password: "MyPassword123" };
	let app: INestApplication;
	let prisma: PrismaService;

	const createUserRequest = async (createUserData: { email: string; password: string }) => {
		return await request(app.getHttpServer()).mutate(userQueries.CREATE_USER).variables({ createUserData });
	};

	const loginRequest = async (loginData: { email: string; password: string }) => {
		return await request(app.getHttpServer()).mutate(userQueries.LOGIN).variables({ loginData });
	};

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
		prisma = moduleRef.get(PrismaService);
		app = moduleRef.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ transform: true }));
		await app.init();
	});

	describe("Create User", () => {
		afterEach(async () => {
			await prisma.user.deleteMany();
		});

		it("Creates a new user", async () => {
			const { data } = await createUserRequest({ ...userData, email: userData.email.toUpperCase() });
			const dbUser = await prisma.user.findFirst({ where: { email: userData.email } });

			expect(data).toEqual({ createUser: "Success: A new user was created" });

			expect(dbUser).toEqual({
				id: expect.any(String),
				email: expect.stringContaining(userData.email),
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

	describe("Login", () => {
		beforeEach(async () => {
			await createUserRequest(userData);
		});

		afterEach(async () => {
			await prisma.user.deleteMany();
		});

		it("Throws an error if email is wrong", async () => {
			const { errors } = await loginRequest({ email: "notValid", password: "123" });
			expect(errors[0]).toHaveProperty("message", "unauthorized: Email/Password is wrong");
		});

		it("Throws an error if password is wrong", async () => {
			const { errors } = await loginRequest({ email: userData.email, password: "123" });
			expect(errors[0]).toHaveProperty("message", "unauthorized: Email/Password is wrong");
		});

		it("Login", async () => {
			const { data } = await loginRequest(userData);

			expect(data).toEqual({
				login: {
					id: expect.any(String),
					email: expect.stringMatching(userData.email),
					token: expect.any(String),
				},
			});
		});
	});
});
