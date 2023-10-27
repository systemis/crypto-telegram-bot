import { BotCommand } from 'node-telegram-bot-api';

/**
 * @var {string} BotCommandText
 * @dev The text of the Telegram bot command.
 */
export enum BotCommandText {
  START = 'start',
  HELP = 'help',
  CREATE = 'create-account',
}

/**
 * @var {BotCommand[]} BOT_COMMANDS
 * @dev The list of the Telegram bot commands.
 */
export const BOT_COMMANDS: BotCommand[] = [
  {
    command: BotCommandText.START,
    description: 'Start bot',
  },
  {
    command: BotCommandText.HELP,
    description: 'Help bot',
  },
  {
    command: BotCommandText.CREATE,
    description: 'Create a Kollec.tech account to use bot.',
  },
];
