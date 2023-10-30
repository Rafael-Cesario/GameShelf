import { join } from "path";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { Module } from "@nestjs/common";
import { AppResolver } from "./app.resolver";
import { PrismaModule } from "./database/prisma.module";
import { UserModule } from "./models/user/user.module";

const GraphQL = GraphQLModule.forRoot<ApolloDriverConfig>({
	driver: ApolloDriver,
	autoSchemaFile: join(process.cwd(), "src/schema.gql"),
	sortSchema: true,
	playground: false,
	plugins: [ApolloServerPluginLandingPageLocalDefault()],
	formatError: (error: any) => ({ message: error.extensions?.originalError?.message || error.message }),
});

@Module({
	imports: [PrismaModule, UserModule, GraphQL],
	providers: [AppResolver],
})
export class AppModule {}
