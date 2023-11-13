import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserInput } from "./user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async createUser(createUserData: CreateUserInput) {
		const { email, password } = createUserData;

		const isDuplicated = !!(await this.prisma.user.findFirst({ where: { email } }));
		if (isDuplicated) throw new ConflictException("Duplicated: A user with the same name already exist");

		const passwordHash = await bcrypt.hash(password, 10);
		createUserData.password = passwordHash;

		await this.prisma.user.create({ data: createUserData });
		return "Success: A new user was created";
	}
}
