import { Injectable, Logger } from '@nestjs/common';
import { MessageEntity } from '@/src/entities/message.entity';

import { BotProvider } from '@/src/providers/bot.provider';
import { GoogleOauth2Provier } from '@/src/providers/google-oauth2.provider';

@Injectable()
export class TelegramService {
  private readonly logger: Logger;

  /**
   * @dev Initialize instance of TelegramBot.
   * @param {BotProvider} botProvider BotProvider instance.
   */
  constructor(
    private readonly botProvider: BotProvider,
    private readonly googleOauth2Provier: GoogleOauth2Provier,
  ) {
    this.logger = new Logger(TelegramService.name);

    // Set bot commands.
    this.botProvider.bot.setMyCommands([
      {
        command: 'start',
        description: 'Start bot',
      },
      {
        command: 'help',
        description: 'Help bot',
      },
      {
        command: 'login',
        description: 'Login to Kollec',
      },
    ]);

    // Handle on receive message.
    this.botProvider.bot.on('message', this.onReceiveMessage);
  }

  /**
   * @dev Handle received message.
   * @param {MessageEntity} msg Message.
   */
  private onReceiveMessage = (msg: MessageEntity) => {
    /**
     * @dev Handle on receive command.
     */
    if (msg.entities?.find((entity) => entity.type === 'bot_command')) {
      // Handle on receive command.
      switch (msg.text) {
        case '/login':
          this.botProvider.bot.sendMessage(
            msg.chat.id,
            `Let's login at KollecTech 🚀`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: `Open App`,
                      url: 't.me/KollecTech_bot/KollecTech',
                    },
                  ],
                ],
              },
            },
          );
          break;
        default:
          break;
      }
    }
  };
}
