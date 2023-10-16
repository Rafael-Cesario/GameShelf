import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserInput, LoginInput } from "./user.dto";
import { PrismaService } from "src/database/prisma.service";
import { comparePasswords, encryptPassword } from "src/utils/crypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}

	async createUser(createUserData: CreateUserInput) {
		const isDuplicated = await this.prisma.user.findFirst({ where: { email: createUserData.email } });
		if (isDuplicated) throw new ConflictException("duplicated: Email already in use");

		createUserData.password = encryptPassword(createUserData.password);

		const user = await this.prisma.user.create({ data: createUserData });
		delete user.password;
		return user;
	}

	async login(loginData: LoginInput) {
		const user = await this.prisma.user.findFirst({ where: { email: loginData.email } });
		if (!user) throw new UnauthorizedException("Unauthorized: Wrong email or password");

		const samePassword = comparePasswords(loginData.password, user.password);
		if (!samePassword) throw new UnauthorizedException("Unauthorized: Wrong email or password");

		const token = await this.jwt.signAsync({ email: user.email });

		delete user.password;
		return { ...user, token };
	}
}
