import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { CreateLinkDto } from "./dto/create-link.dto";
import { LinkService } from "./links/links.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly linkService: LinkService) {}

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/create')
  createLink(
    @Body() createLinkDto: CreateLinkDto,
    @Body('password') password?: string,
    @Body('expirationDate') expirationDate?: Date,
  ) {
    const { target } = createLinkDto;
    const newLink = this.linkService.createLink(target, password, expirationDate);
    return {
      message: 'Link creado exitosamente',
      maskedUrl: newLink.link,
    };
  }
}
