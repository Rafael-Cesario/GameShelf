import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserInput } from "./user.dto";
import { PrismaService } from "src/database/prisma.service";
import { encryptPassword } from "src/utils/crypt";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async createUser(createUserData: CreateUserInput) {
		const isDuplicated = await this.prisma.user.findFirst({ where: { email: createUserData.email } });
		if (isDuplicated) throw new ConflictException("duplicated: Email already in use");

		createUserData.password = encryptPassword(createUserData.password);

		const user = await this.prisma.user.create({ data: createUserData });
		delete user.password;
		return user;
	}
}
