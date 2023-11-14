import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: process.env.SECRET,
			// expires in 7 days
			signOptions: { expiresIn: 60 * 60 * 24 * 7 },
		}),
	],
	providers: [UserService, UserResolver],
})
export class UserModule {}
