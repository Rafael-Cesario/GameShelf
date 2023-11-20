import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@Apollo/server/plugin/landingPage/default";
import { join } from "path";
import { PrismaModule } from "./prisma.module";
import { UserModule } from "./models/user/user.module";
import { CollectionModule } from "./models/collection/collection.module";
import { GameModule } from "./models/game/game.module";

const ModuleGraphQl = GraphQLModule.forRoot<ApolloDriverConfig>({
	driver: ApolloDriver,
	autoSchemaFile: join(process.cwd(), "src/schema.gql"),
	sortSchema: true,
	playground: false,
	plugins: [ApolloServerPluginLandingPageLocalDefault()],
	formatError: (error) => ({ message: error.message, status: error.extensions.code, errors: error.extensions?.originalError || "" }),
});

@Module({
	imports: [ModuleGraphQl, PrismaModule, UserModule, CollectionModule, GameModule],
})
export class AppModule {}
