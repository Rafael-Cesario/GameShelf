import { Injectable, BadRequestException, StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";

@Injectable()
export class AppService {
	getImage(game: string): StreamableFile {
		const path = join(process.cwd(), "images", `${game}.png`);
		const image = createReadStream(path);

		image.on("error", () => {
			throw new BadRequestException("Image not found");
		});

		return new StreamableFile(image);
	}
}
