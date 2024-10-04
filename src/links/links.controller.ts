import { Controller, Post, Body, Get, Param, Put, Query, NotFoundException } from '@nestjs/common';
import { LinkService } from "./links.service";
import { CreateLinkDto } from "../dto/create-link.dto";

@Controller('l')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
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

  @Get('/:id')
  redirectToOriginal(
    @Param('id') id: string,
    @Query('password') password?: string,
  ) {
    const link = this.linkService.getLinkById(id, password);
    if (!link) {
      throw new NotFoundException('Link no válido o expirado.');
    }

    this.linkService.incrementStats(id);
    return {
      redirectUrl: link.target,
    };
  }

  @Get('/:id/stats')
  getLinkStats(@Param('id') id: string) {
    const stats = this.linkService.getStats(id);
    if (stats === undefined) {
      throw new NotFoundException('Link no encontrado.');
    }
    return {
      stats,
    };
  }

  @Put('/:id/invalidate')
  invalidateLink(@Param('id') id: string) {
    const success = this.linkService.invalidateLink(id);
    if (!success) {
      throw new NotFoundException('Link no encontrado.');
    }
    return {
      message: 'Link invalidado exitosamente',
    };
  }
}
