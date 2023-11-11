import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@Apollo/server/plugin/landingPage/default";
import { join } from "path";
import { PrismaModule } from "./prisma.module";

const ModuleGraphQl = GraphQLModule.forRoot<ApolloDriverConfig>({
	driver: ApolloDriver,
	autoSchemaFile: join(process.cwd(), "src/schema.gql"),
	sortSchema: true,
	playground: false,
	plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

@Module({
	imports: [ModuleGraphQl, PrismaModule],
})
export class AppModule {}
