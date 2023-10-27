import { Injectable, Logger } from '@nestjs/common';
import { MessageEntity } from '@/src/entities/message.entity';

import { BotProvider } from '@/src/providers/bot.provider';

import { memoize } from '@/src/decorators/memoize.decorator';
import { RegistryProvider } from '@/src/providers/registry.provider';
import { TelegramAuth } from '@/src/decorators/telegram-auth.decorator';
import { TelegramAuthProvider } from '@/src/providers/telegram-auth.provider';
// import { TelegramAuth } from '@/src/decorators/telegram-auth.decorator';

@Injectable()
export class TelegramService {
  private readonly logger: Logger;

  /**
   * @dev Initialize instance of TelegramBot.
   * @param {BotProvider} botProvider BotProvider instance.
   */
  constructor(
    private readonly botProvider: BotProvider,
    private readonly registryProvider: RegistryProvider,
    public readonly telegramAuthProvider: TelegramAuthProvider,
  ) {
    this.logger = new Logger(TelegramService.name);

    this.botProvider.bot.setMyCommands(
      this.registryProvider.getConfig().botCommands,
    );

    // Handle on receive message.
    this.botProvider.bot.on('message', this.onReceiveMessage.bind(this));
  }

  /**
   * @dev Handle received message.
   * @param {MessageEntity} msg Message.
   */
  @memoize()
  @TelegramAuth()
  private async onReceiveMessage(msg: MessageEntity) {
    console.log('message listen');
    if (msg.entities?.find((entity) => entity.type === 'bot_command')) {
      // Handle on receive command.
      console.log('Command listen');
    }
  }
}
