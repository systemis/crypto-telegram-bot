import { Module } from '@nestjs/common';
import { BotProvider } from '@/src/providers/bot.provider';
import { RegistryProvider } from '@/src/providers/registry.provider';
import { GoogleOauth2Provier } from '@/src/providers/google-oauth2.provider';

import { TelegramService } from './telegram.service';

@Module({
  providers: [
    RegistryProvider,
    GoogleOauth2Provier,
    BotProvider,
    TelegramService,
  ],
})
export class TelegramModule {}
