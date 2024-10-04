import { Module } from '@nestjs/common';
import { LinkController } from './links.controller';
import { LinkService } from './links.service';

@Module({
  controllers: [LinkController],
  providers: [LinkService]
})

export class LinksModule {}
