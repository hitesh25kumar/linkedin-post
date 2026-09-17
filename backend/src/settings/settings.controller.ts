import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(@CurrentUser() user: { sub: string }) {
    return this.settingsService.getSettings(user.sub);
  }

  @Patch()
  updateSettings(@CurrentUser() user: { sub: string }, @Body() dto: any) {
    return this.settingsService.updateSettings(user.sub, dto);
  }
}

