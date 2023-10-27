import { Module } from '@nestjs/common';
import { BotProvider } from '@/src/providers/bot.provider';
import { RegistryProvider } from '@/src/providers/registry.provider';
import { GoogleOauth2Provier } from '@/src/providers/google-oauth2.provider';

import { TelegramService } from './telegram.service';
import { TelegramAuthProvider } from '../providers/telegram-auth.provider';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [
    RegistryProvider,
    GoogleOauth2Provier,
    TelegramAuthProvider,
    BotProvider,
    TelegramService,
  ],
  exports: [BotProvider, TelegramAuthProvider],
})
export class TelegramModule {}
