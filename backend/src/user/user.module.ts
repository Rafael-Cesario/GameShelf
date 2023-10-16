import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtConstants } from "./constants";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: JwtConstants.secret,
			signOptions: { expiresIn: JwtConstants.expiresIn },
		}),
	],

	providers: [UserService, UserResolver],
})
export class UserModule {}
