import { join } from "path";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { Module } from "@nestjs/common";
import { AppResolver } from "./app.resolver";
import { PrismaModule } from "./database/prisma.module";

@Module({
	imports: [
		PrismaModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
			sortSchema: true,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
		}),
	],

	providers: [AppResolver],
})
export class AppModule {}
