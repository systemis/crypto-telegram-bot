import { Injectable } from '@nestjs/common';
import { RegistryProvider } from '@/src/providers/registry.provider';

import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotProvider {
  private readonly _bot: TelegramBot;

  /**
   * @dev Initialize bot.
   * @param {registryProvider} registryProvider RegistryProvider instance.
   */
  constructor(private readonly registryProvider: RegistryProvider) {
    this._bot = new TelegramBot(
      this.registryProvider.getConfig().TELEGRAM_TOKEN,
      {
        polling: true,
      },
    );
  }

  /**
   * @dev Send message to user.
   * @param {string} userId User ID.
   * @param {string} message Message.
   */
  public sendMessageToUser = (userId: string, message: string) => {
    this.bot.sendMessage(userId, message);
  };

  /**
   * @dev Get bot instance.
   * @returns {TelegramBot} TelegramBot instance.
   */
  public get bot(): TelegramBot {
    return this._bot;
  }
}
