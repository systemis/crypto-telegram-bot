import { TelegramAuthProvider } from '@/src/providers/telegram-auth.provider';
import { MessageEntity } from '@/src/entities/message.entity';
import { BotProvider } from '@/src/providers/bot.provider';

// eslint-disable-next-line @typescript-eslint/ban-types
export function TelegramAuth() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): any {
    const originalMethod = descriptor.value;

    descriptor.value = async function (msg: MessageEntity) {
      // Extract TelegramAuthProvider instance.
      const authProvider = this.telegramAuthProvider as TelegramAuthProvider;
      const botProvider = this.botProvider as BotProvider;

      // Check if the 'userId' from the 'msg' object exists in the database
      const userExists = await authProvider.findUserByTelegramId(msg.from.id);

      if (userExists) {
        return originalMethod.call(this, msg);
      } else {
        botProvider.bot.sendMessage(
          msg.chat.id,
          `Let's login at KollecTech 🚀`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: `Open App`,
                    url: 't.me/Kollectivee_bot/account',
                  },
                ],
              ],
            },
          },
        );
      }
    };

    return descriptor;
  };
}
