import { Controller, Get, Header, StreamableFile, Param } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(":game")
	@Header("Content-Type", "image/png")
	getImage(@Param() params: { game: string }): StreamableFile {
		return this.appService.getImage(params.game);
	}
}
