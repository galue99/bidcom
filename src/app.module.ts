import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from "./app.service";
import { LinkController } from "./links/links.controller";
import { LinkService } from "./links/links.service";

@Module({
  imports: [],
  controllers: [AppController, LinkController],
  providers: [AppService, LinkService],
})

export class AppModule {}
