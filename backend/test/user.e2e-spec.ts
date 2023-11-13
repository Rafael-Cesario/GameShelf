import request from "supertest-graphql";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { userQueries } from "./queries/user";
import { PrismaService } from "src/prisma.service";

describe("User", () => {
	let app: INestApplication;
	let prisma: PrismaService;

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

	// it("Throws an error if email is invalid");
	// it("Throws an error if the password is less than 10 characters")
	// it("Throws an error if email is already in use")

	it("Creates a new user", async () => {
		const user = { email: "USER01@EMAIL.COM", password: "MyPassword123" };
		const { data } = await request(app.getHttpServer()).mutate(userQueries.CREATE_USER).variables({ createUserData: user });

		expect(data).toEqual({ createUser: "Success: A new user was created" });

		const dbUser = await prisma.user.findFirst({ where: { email: user.email.toLowerCase() } });

		expect(dbUser).toEqual({
			id: expect.any(String),
			email: expect.stringContaining(user.email.toLowerCase()),
			password: expect.not.stringContaining(user.password),
		});
	});
});
