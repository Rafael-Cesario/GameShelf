import request from "supertest-graphql";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreateUserInput } from "src/user/user.dto";
import { User } from "src/user/user.model";
import { PrismaService } from "src/database/prisma.service";
import { userQueries } from "./queries/user";

describe("User e2e", () => {
	let app: INestApplication;
	let prisma: PrismaService;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ transform: true }));
		prisma = moduleFixture.get(PrismaService);
		await app.init();
	});

	describe("Create User", () => {
		afterEach(async () => {
			await prisma.user.deleteMany();
		});

		it("Creates a new user", async () => {
			const userValues = { email: "USER01@EMAIL.COM", name: "USER01", password: "Password123" };
			const { data } = await request<{ createUser: User }, { createUserData: CreateUserInput }>(app.getHttpServer()).mutate(userQueries.CREATE_USER).variables({ createUserData: userValues });

			expect(data.createUser).not.toHaveProperty("password");
			expect(data.createUser).toEqual({
				id: expect.any(String),
				email: expect.stringContaining(userValues.email.toLowerCase()),
				name: expect.stringContaining(userValues.name.toLowerCase()),
			});

			const user = await prisma.user.findFirst({ where: { email: userValues.email.toLowerCase() } });
			expect(user.password).not.toBe(userValues.password);
		});
	});
});
