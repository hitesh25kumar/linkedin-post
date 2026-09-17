import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll(@CurrentUser() user: { sub: string }) {
    return this.templatesService.findAll(user.sub);
  }

  @Post()
  create(@CurrentUser() user: { sub: string }, @Body() dto: any) {
    return this.templatesService.create(user.sub, dto);
  }

  @Patch(':id')
  update(@CurrentUser() user: { sub: string }, @Param('id') id: string, @Body() dto: any) {
    return this.templatesService.update(user.sub, id, dto);
  }

  @Delete(':id')
  delete(@CurrentUser() user: { sub: string }, @Param('id') id: string) {
    return this.templatesService.delete(user.sub, id);
  }
}

