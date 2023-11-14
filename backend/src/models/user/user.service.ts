import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserInput, LoginInput } from "./user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService
	) {}

	async createUser(createUserData: CreateUserInput) {
		const { email, password } = createUserData;

		const isDuplicated = !!(await this.prisma.user.findFirst({ where: { email } }));
		if (isDuplicated) throw new ConflictException("Duplicated: A user with the same name already exist");

		const passwordHash = await bcrypt.hash(password, 10);
		createUserData.password = passwordHash;

		await this.prisma.user.create({ data: createUserData });
		return "Success: A new user was created";
	}

	async login(loginData: LoginInput) {
		const { email, password } = loginData;

		const user = await this.prisma.user.findFirst({ where: { email } });
		if (!user) throw new UnauthorizedException("unauthorized: Email/Password is wrong");

		const isSamePassword = await bcrypt.compare(password, user.password);
		if (!isSamePassword) throw new UnauthorizedException("unauthorized: Email/Password is wrong");

		const token = await this.jwtService.signAsync({ email });
		delete user.password;

		return { ...user, token };
	}
}
